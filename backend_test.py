import requests
import sys
from datetime import datetime
import json

class PsychologistWebsiteAPITester:
    def __init__(self, base_url="https://equilibrio-psiche.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                except:
                    result["response_data"] = response.text[:200]
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {error_data}")
                except:
                    result["error"] = response.text[:200]
                    print(f"   Error: {response.text[:200]}")

            self.results.append(result)
            return success, response.json() if success and response.headers.get('content-type', '').startswith('application/json') else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.results.append(result)
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        return self.run_test("Health Check", "GET", "api/health", 200)

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root API", "GET", "api/", 200)

    def test_contact_form_submission(self):
        """Test contact form submission"""
        test_data = {
            "nome": "Test User",
            "email": "test@example.com",
            "telefono": "1234567890",
            "messaggio": "Questo è un messaggio di test per verificare il funzionamento del form di contatto.",
            "privacy_accepted": True
        }
        
        success, response = self.run_test(
            "Contact Form Submission",
            "POST",
            "api/contact",
            200,
            data=test_data
        )
        
        if success and response:
            # Verify response structure
            required_fields = ["id", "nome", "email", "telefono", "messaggio", "timestamp", "letto"]
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Warning: Missing fields in response: {missing_fields}")
            else:
                print(f"✅ Response structure is correct")
                
        return success, response

    def test_contact_form_validation(self):
        """Test contact form validation with invalid data"""
        # Test missing privacy acceptance
        invalid_data = {
            "nome": "Test User",
            "email": "test@example.com", 
            "telefono": "1234567890",
            "messaggio": "Test message",
            "privacy_accepted": False
        }
        
        return self.run_test(
            "Contact Form Validation (Privacy)",
            "POST",
            "api/contact",
            400,
            data=invalid_data
        )

    def test_get_contact_messages(self):
        """Test getting contact messages (admin endpoint)"""
        return self.run_test("Get Contact Messages", "GET", "api/contact", 200)

    def test_status_endpoint(self):
        """Test status endpoint"""
        test_data = {
            "client_name": "test_client"
        }
        return self.run_test("Status Check", "POST", "api/status", 200, data=test_data)

def main():
    print("🧪 Starting Psychologist Website API Tests")
    print("=" * 50)
    
    tester = PsychologistWebsiteAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests...")
    
    # Basic connectivity tests
    tester.test_health_check()
    tester.test_root_endpoint()
    
    # Contact form tests
    tester.test_contact_form_submission()
    tester.test_contact_form_validation()
    tester.test_get_contact_messages()
    
    # Status endpoint test
    tester.test_status_endpoint()
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Print failed tests details
    failed_tests = [r for r in tester.results if not r["success"]]
    if failed_tests:
        print(f"\n❌ Failed Tests Details:")
        for test in failed_tests:
            error_msg = test['error'] or f"Status {test['actual_status']} (expected {test['expected_status']})"
            print(f"   • {test['test_name']}: {error_msg}")
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump({
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100 if tester.tests_run > 0 else 0
            },
            "results": tester.results
        }, f, indent=2, default=str)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())