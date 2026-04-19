"""
Backend API Tests for Dott.ssa Alexandra Diana Ciontu - Psicologa Website
Tests: Health check, Contact form submission, Contact messages retrieval
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_check(self):
        """Test /api/health returns healthy status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "psicologa-website"
        print("✓ Health check passed")

    def test_root_endpoint(self):
        """Test /api/ root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print("✓ Root endpoint passed")


class TestContactEndpoint:
    """Contact form endpoint tests"""
    
    def test_contact_form_submission_success(self):
        """Test successful contact form submission with all required fields"""
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "nome": f"TEST_Mario Rossi {unique_id}",
            "email": f"test_{unique_id}@example.com",
            "telefono": "3331234567",
            "messaggio": "Vorrei prenotare un appuntamento per una consulenza iniziale.",
            "luogo": "Studio Privato - Ostia Simonetti",
            "privacy_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["nome"] == payload["nome"]
        assert data["email"] == payload["email"]
        assert data["telefono"] == payload["telefono"]
        assert data["messaggio"] == payload["messaggio"]
        assert data["luogo"] == payload["luogo"]
        assert "timestamp" in data
        assert data["letto"] == False
        print(f"✓ Contact form submission passed - ID: {data['id']}")
        return data["id"]

    def test_contact_form_validation_missing_nome(self):
        """Test contact form validation - missing nome"""
        payload = {
            "email": "test@example.com",
            "telefono": "3331234567",
            "messaggio": "Test message for validation",
            "luogo": "Studio Privato - Ostia Simonetti",
            "privacy_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422 for missing nome, got {response.status_code}"
        print("✓ Validation for missing nome passed")

    def test_contact_form_validation_invalid_email(self):
        """Test contact form validation - invalid email format"""
        payload = {
            "nome": "TEST_Invalid Email",
            "email": "invalid-email",
            "telefono": "3331234567",
            "messaggio": "Test message for validation",
            "luogo": "Studio Privato - Ostia Simonetti",
            "privacy_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422 for invalid email, got {response.status_code}"
        print("✓ Validation for invalid email passed")

    def test_contact_form_validation_short_messaggio(self):
        """Test contact form validation - message too short (min 10 chars)"""
        payload = {
            "nome": "TEST_Short Message",
            "email": "test@example.com",
            "telefono": "3331234567",
            "messaggio": "Short",  # Less than 10 characters
            "luogo": "Studio Privato - Ostia Simonetti",
            "privacy_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422 for short message, got {response.status_code}"
        print("✓ Validation for short message passed")

    def test_contact_form_validation_privacy_not_accepted(self):
        """Test contact form validation - privacy not accepted"""
        payload = {
            "nome": "TEST_Privacy Not Accepted",
            "email": "test@example.com",
            "telefono": "3331234567",
            "messaggio": "Test message for privacy validation",
            "luogo": "Studio Privato - Ostia Simonetti",
            "privacy_accepted": False
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 400, f"Expected 400 for privacy not accepted, got {response.status_code}"
        data = response.json()
        assert "privacy" in data.get("detail", "").lower() or "privacy" in str(data).lower()
        print("✓ Validation for privacy not accepted passed")

    def test_contact_form_validation_missing_luogo(self):
        """Test contact form validation - missing luogo (location)"""
        payload = {
            "nome": "TEST_Missing Location",
            "email": "test@example.com",
            "telefono": "3331234567",
            "messaggio": "Test message for location validation",
            "privacy_accepted": True
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422, f"Expected 422 for missing luogo, got {response.status_code}"
        print("✓ Validation for missing luogo passed")


class TestContactMessagesRetrieval:
    """Contact messages retrieval tests"""
    
    def test_get_contact_messages(self):
        """Test GET /api/contact returns list of messages"""
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Get contact messages passed - Found {len(data)} messages")

    def test_contact_message_persistence(self):
        """Test that submitted contact message is persisted and retrievable"""
        # Create a unique message
        unique_id = str(uuid.uuid4())[:8]
        payload = {
            "nome": f"TEST_Persistence Check {unique_id}",
            "email": f"persistence_{unique_id}@example.com",
            "telefono": "3339876543",
            "messaggio": "This is a test message to verify persistence in MongoDB.",
            "luogo": "Associazione L'Albero della Vita - Fiumicino",
            "privacy_accepted": True
        }
        
        # Submit the message
        post_response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert post_response.status_code == 200
        created_message = post_response.json()
        message_id = created_message["id"]
        
        # Retrieve all messages and verify our message exists
        get_response = requests.get(f"{BASE_URL}/api/contact")
        assert get_response.status_code == 200
        
        messages = get_response.json()
        found_message = next((m for m in messages if m["id"] == message_id), None)
        
        assert found_message is not None, f"Message with ID {message_id} not found in database"
        assert found_message["nome"] == payload["nome"]
        assert found_message["email"] == payload["email"]
        assert found_message["luogo"] == payload["luogo"]
        print(f"✓ Contact message persistence verified - ID: {message_id}")


class TestStatusEndpoint:
    """Status endpoint tests"""
    
    def test_create_status_check(self):
        """Test POST /api/status creates a status check"""
        payload = {"client_name": "TEST_Client"}
        
        response = requests.post(f"{BASE_URL}/api/status", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert "id" in data
        assert data["client_name"] == "TEST_Client"
        assert "timestamp" in data
        print(f"✓ Status check creation passed - ID: {data['id']}")

    def test_get_status_checks(self):
        """Test GET /api/status returns list of status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Get status checks passed - Found {len(data)} checks")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
