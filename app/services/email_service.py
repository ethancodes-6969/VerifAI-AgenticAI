import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from datetime import datetime
from app.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

class EmailService:
    def __init__(self):
        self.sender = settings.EMAIL_SENDER
        self.password = settings.EMAIL_PASSWORD
        self.smtp_server = settings.SMTP_SERVER
        self.smtp_port = settings.SMTP_PORT
        self.logo_url = settings.LOGO_URL
        self.support_phone = settings.SUPPORT_PHONE
        self.support_email = settings.SUPPORT_EMAIL

    async def send_email(self, to_email: str, subject: str, html_content: str):
        """Generic method to send HTML emails"""
        if not to_email or not self.password or self.password == "xxxx xxxx xxxx xxxx":
            logger.warning("Email not sent: Missing recipient or invalid credentials.")
            return {"success": False, "error": "Invalid config"}

        try:
            msg = MIMEMultipart()
            msg['From'] = f"VerifAI Security <{self.sender}>"
            msg['To'] = to_email
            msg['Subject'] = subject

            msg.attach(MIMEText(html_content, 'html'))

            # Connect to SMTP server
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                server.login(self.sender, self.password)
                server.send_message(msg)
            
            logger.info(f"📧 Email sent successfully to {to_email}")
            return {"success": True}
        
        except Exception as e:
            logger.error(f"❌ Failed to send email: {str(e)}")
            return {"success": False, "error": str(e)}

    def _get_base_template(self, title, content, color="#4A90E2"):
        """Base HTML template with branding"""
        return f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{ font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }}
                .container {{ max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }}
                .header {{ background-color: {color}; padding: 30px; text-align: center; color: white; }}
                .header h1 {{ margin: 0; font-size: 24px; }}
                .content {{ padding: 40px; color: #333; line-height: 1.6; }}
                .footer {{ background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #eee; }}
                .button {{ display: inline-block; padding: 12px 24px; background-color: {color}; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }}
                .alert-box {{ background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; }}
                .details-table {{ width: 100%; border-collapse: collapse; margin: 20px 0; }}
                .details-table td {{ padding: 10px; border-bottom: 1px solid #eee; }}
                .details-table td:first-child {{ font-weight: bold; color: #555; width: 40%; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>{title}</h1>
                </div>
                <div class="content">
                    {content}
                </div>
                <div class="footer">
                    <p>Protected by VerifAI Security Systems</p>
                    <p>Need help? Call {self.support_phone} or email {self.support_email}</p>
                </div>
            </div>
        </body>
        </html>
        """

    async def send_fraud_alert(self, to_email, user_id, amount, merchant, fraud_score, category, tx_id):
        """Send Critical Fraud Alert (RED)"""
        content = f"""
            <h2 style="color: #dc3545; margin-top: 0;">🚨 Suspicious Activity Detected</h2>
            <p>We blocked a high-risk transaction on your account due to unusual activity patterns.</p>
            
            <div class="alert-box" style="background-color: #f8d7da; border-color: #f5c6cb; color: #721c24;">
                <strong>Risk Score: {int(fraud_score * 100)}%</strong> - This transaction matches known fraud patterns.
            </div>

            <table class="details-table">
                <tr><td>Merchant:</td><td>{merchant}</td></tr>
                <tr><td>Amount:</td><td>₹{amount:,.2f}</td></tr>
                <tr><td>Category:</td><td>{category}</td></tr>
                <tr><td>Time:</td><td>{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</td></tr>
                <tr><td>Transaction ID:</td><td>{tx_id}</td></tr>
            </table>

            <p>If this was you, please contact support immediately to unblock your account.</p>
            <center>
                <a href="#" class="button" style="background-color: #dc3545;">Report as Fraud</a>
                <a href="#" class="button" style="background-color: #6c757d; margin-left: 10px;">It was me</a>
            </center>
        """
        return await self.send_email(to_email, f"🚨 Fraud Alert: Transaction Blocked at {merchant}", self._get_base_template("VerifAI Security Alert", content, "#dc3545"))

    async def send_verification_required(self, to_email, user_id, amount, merchant, fraud_score, tx_id):
        """Send Verification Request (YELLOW)"""
        content = f"""
            <h2 style="color: #ffc107; margin-top: 0;">⚠️ Verification Required</h2>
            <p>We noticed a transaction that requires your confirmation before we can proceed.</p>
            
            <table class="details-table">
                <tr><td>Merchant:</td><td>{merchant}</td></tr>
                <tr><td>Amount:</td><td>₹{amount:,.2f}</td></tr>
                <tr><td>Transaction ID:</td><td>{tx_id}</td></tr>
            </table>

            <p>Please confirm if you authorized this payment.</p>
            <center>
                <a href="#" class="button" style="background-color: #ffc107; color: #000;">Authorize Payment</a>
            </center>
        """
        return await self.send_email(to_email, f"⚠️ Action Required: Verify Transaction at {merchant}", self._get_base_template("Verify Transaction", content, "#ffc107"))

    async def send_transaction_approved(self, to_email, user_id, amount, merchant, tx_id):
        """Send Approval Confirmation (GREEN)"""
        content = f"""
            <h2 style="color: #28a745; margin-top: 0;">✅ Transaction Approved</h2>
            <p>Your transaction has been successfully processed and verified.</p>
            
            <table class="details-table">
                <tr><td>Merchant:</td><td>{merchant}</td></tr>
                <tr><td>Amount:</td><td>₹{amount:,.2f}</td></tr>
                <tr><td>Transaction ID:</td><td>{tx_id}</td></tr>
            </table>
        """
        return await self.send_email(to_email, f"✅ Receipt: Payment to {merchant}", self._get_base_template("Payment Successful", content, "#28a745"))

    async def send_account_locked(self, to_email, user_id, tx_id):
        """Send Account Locked Notification"""
        content = f"""
            <h2 style="color: #333; margin-top: 0;">🔒 Account Temporarily Locked</h2>
            <p>For your security, we have temporarily locked your account following a critical security alert (Ref: {tx_id}).</p>
            <p>Please contact our fraud prevention team to verify your identity and restore access.</p>
            <p><strong>Support: {self.support_phone}</strong></p>
        """
        return await self.send_email(to_email, "🔒 Security Alert: Account Locked", self._get_base_template("Account Locked", content, "#343a40"))
