
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

sender = "krishsanghavi09@gmail.com"
password = "uoav zcfd jtks takd"
recipient = "aagamsanghavi2@gmail.com"

msg = MIMEMultipart()
msg["Subject"] = "Test Email from VerifAI"
msg["From"] = sender
msg["To"] = recipient
msg.attach(MIMEText("✅ Gmail SMTP test successful! Your email is ready for VerifAI.", "plain"))

try:
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())
    print("✅ Email sent! Check your inbox.")
except Exception as e:
    print(f"❌ Error: {e}")
