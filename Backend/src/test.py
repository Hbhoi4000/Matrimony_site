import smtplib
from email.mime.text import MIMEText

# REPLACE WITH YOUR ACTUAL DETAILS
GMAIL_USER = "hbhoi4000@gmail.com"
GMAIL_APP_PASSWORD = "mqxvtjfqepzhqalf" # 16 chars without spaces

msg = MIMEText("This is a test email for FastAPI OTP verification.")
msg['Subject'] = "Test OTP Email"
msg['From'] = GMAIL_USER
msg['To'] = GMAIL_USER

try:
    print("Connecting to Gmail SMTP...")
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    print("Logging in...")
    server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
    print("Sending email...")
    server.sendmail(GMAIL_USER, [GMAIL_USER], msg.as_string())
    server.quit()
    print("SUCCESS: Test email sent successfully!")
except Exception as e:
    print(f"FAILED: {e}")