# Newsletter Platform Deployment Guide

## Pre-deployment Checklist

### 1. Environment Variables
- [ ] Set up production Clerk application and get new API keys
- [ ] Configure production AWS SES credentials
- [ ] Set up production Stripe account and configure webhooks
- [ ] Generate new JWT secret for production
- [ ] Configure production MongoDB database URI
- [ ] Set up production ZeroBounce API key
- [ ] Update NEXT_PUBLIC_WEBSITE_URL to production URL

### 2. Database Setup
- [ ] Create production MongoDB database
- [ ] Configure network access for Render IP ranges
- [ ] Set up database indexes
- [ ] Verify connection string works

### 3. External Services
- [ ] Configure AWS SES production sending limits
- [ ] Set up Stripe webhook endpoints for production URL
- [ ] Configure Clerk authentication settings for production domain
- [ ] Verify ZeroBounce API access

## Render.com Deployment Steps

1. Create a new Web Service:
   - Connect your GitHub repository
   - Select the main/master branch
   - Choose Node.js environment

2. Configure Build Settings:
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

3. Add Environment Variables:
   - Copy all variables from .env.local
   - Update values for production environment
   - Ensure NEXT_PUBLIC_WEBSITE_URL matches Render domain

4. Configure Auto-Deploy:
   - Enable automatic deployments
   - Set up branch rules if needed

5. Health Check Setup:
   - Path: /
   - Ensure application responds correctly

## Post-deployment Verification

### 1. Application Features
- [ ] Test user authentication flow
- [ ] Verify email sending functionality
- [ ] Test payment processing
- [ ] Check subscriber management
- [ ] Verify analytics data collection

### 2. Security Checks
- [ ] Verify HTTPS is enforced
- [ ] Check environment variable access
- [ ] Test rate limiting
- [ ] Verify API endpoint protection

### 3. Performance Verification
- [ ] Check page load times
- [ ] Verify static asset delivery
- [ ] Monitor server response times
- [ ] Test under load conditions

### 4. Monitoring Setup
- [ ] Configure error tracking
- [ ] Set up performance monitoring
- [ ] Enable log collection
- [ ] Configure alerts for critical issues

## Rollback Plan

1. Keep previous deployment tag for quick rollback
2. Document database backup procedure
3. Maintain list of critical service dependencies
4. Have emergency contact information ready

## Maintenance Notes

- Regular database backups
- Monitor error rates and performance metrics
- Keep dependencies updated
- Review security patches
- Monitor usage quotas for all external services
