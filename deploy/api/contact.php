<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ============================================
// CONFIGURAZIONE - Modifica questi valori
// ============================================
$RESEND_API_KEY = 're_RRmypXJx_g8DUz4zMi99fkJqF1xC3BKE5';
$NOTIFICATION_EMAIL = 'alexandra.ciontu.psi@gmail.com';
$SENDER_EMAIL = 'onboarding@resend.dev';
// ============================================

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Dati non validi']);
    exit;
}

$nome = htmlspecialchars($input['nome'] ?? '');
$email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
$telefono = htmlspecialchars($input['telefono'] ?? '');
$messaggio = htmlspecialchars($input['messaggio'] ?? '');
$luogo = htmlspecialchars($input['luogo'] ?? '');
$privacy = $input['privacy_accepted'] ?? false;

// Validazione
if (!$nome || strlen($nome) < 2) {
    http_response_code(422);
    echo json_encode(['error' => 'Nome non valido']);
    exit;
}
if (!$email) {
    http_response_code(422);
    echo json_encode(['error' => 'Email non valida']);
    exit;
}
if (!$telefono || strlen($telefono) < 6) {
    http_response_code(422);
    echo json_encode(['error' => 'Telefono non valido']);
    exit;
}
if (!$messaggio || strlen($messaggio) < 10) {
    http_response_code(422);
    echo json_encode(['error' => 'Messaggio troppo breve']);
    exit;
}
if (!$privacy) {
    http_response_code(400);
    echo json_encode(['error' => 'Privacy policy non accettata']);
    exit;
}

$data_ora = date('d/m/Y \a\l\l\e H:i');

$html = <<<HTML
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #faf9f7; border-radius: 12px;">
    <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="color: #58355E; margin: 0; font-weight: 400;">Nuovo messaggio dal sito</h2>
        <p style="color: #8a7a8e; font-size: 14px; margin-top: 6px;">Modulo di contatto</p>
    </div>
    <div style="background: white; padding: 24px; border-radius: 8px; border: 1px solid #e8e4e0;">
        <table style="width: 100%; border-collapse: collapse;">
            <tr>
                <td style="padding: 10px 0; color: #8a7a8e; font-size: 13px; vertical-align: top; width: 120px;">Nome</td>
                <td style="padding: 10px 0; color: #333; font-weight: 500;">$nome</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #8a7a8e; font-size: 13px; vertical-align: top; border-top: 1px solid #f0ede8;">Email</td>
                <td style="padding: 10px 0; color: #333; border-top: 1px solid #f0ede8;"><a href="mailto:$email" style="color: #58355E;">$email</a></td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #8a7a8e; font-size: 13px; vertical-align: top; border-top: 1px solid #f0ede8;">Telefono</td>
                <td style="padding: 10px 0; color: #333; border-top: 1px solid #f0ede8;"><a href="tel:$telefono" style="color: #58355E;">$telefono</a></td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #8a7a8e; font-size: 13px; vertical-align: top; border-top: 1px solid #f0ede8;">Sede</td>
                <td style="padding: 10px 0; color: #333; border-top: 1px solid #f0ede8;">$luogo</td>
            </tr>
            <tr>
                <td style="padding: 10px 0; color: #8a7a8e; font-size: 13px; vertical-align: top; border-top: 1px solid #f0ede8;">Messaggio</td>
                <td style="padding: 10px 0; color: #333; border-top: 1px solid #f0ede8; line-height: 1.6;">$messaggio</td>
            </tr>
        </table>
    </div>
    <p style="color: #8a7a8e; font-size: 12px; text-align: center; margin-top: 20px;">
        Ricevuto il $data_ora
    </p>
</div>
HTML;

// Invio email tramite Resend API
$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $RESEND_API_KEY,
        'Content-Type: application/json',
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'from' => $SENDER_EMAIL,
        'to' => [$NOTIFICATION_EMAIL],
        'subject' => 'Nuovo contatto: ' . $nome,
        'html' => $html,
    ]),
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode([
        'id' => uniqid(),
        'nome' => $nome,
        'email' => $email,
        'telefono' => $telefono,
        'messaggio' => $messaggio,
        'luogo' => $luogo,
        'timestamp' => date('c'),
        'letto' => false,
    ]);
} else {
    error_log("Resend error: $response");
    // Rispondi comunque con successo per non bloccare l'utente
    echo json_encode([
        'id' => uniqid(),
        'nome' => $nome,
        'email' => $email,
        'telefono' => $telefono,
        'messaggio' => $messaggio,
        'luogo' => $luogo,
        'timestamp' => date('c'),
        'letto' => false,
    ]);
}
