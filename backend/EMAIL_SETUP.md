# Email Configuration for Password Reset

To enable password reset functionality, add these variables to your `.env.development` file:

```bash
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
```

## How to get a Gmail App Password:

1. Go to your Google Account: https://myaccount.google.com/
2. In the left menu, select "Security"
3. Enable "2-Step Verification" if you haven't already
4. Search for "App passwords"
5. Create a new app password:
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Name it "BlendBeyond"
6. Google will give you a 16-character password - copy this password
7. Use that password in EMAIL_PASSWORD (without spaces)

## Configuration example:

```bash
EMAIL_USER="blendbeyond@gmail.com"
EMAIL_PASSWORD="abcdefghijklmnop"  # The password Google gave you (no spaces)
```

⚠️ **IMPORTANT**: Never commit the .env.development file to Git. It's already in .gitignore.
