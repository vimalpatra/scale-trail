import { ROUTES } from '@/constants/routes';

export const getRedirectPath = (session) => {
  if (!session) {
    return ROUTES.HOME;
  }

  const onboardingData = localStorage.getItem('onboardingData');
  const onboardingProgress = localStorage.getItem('onboardingProgress');

  if (onboardingProgress && onboardingProgress !== 'completed') {
    return ROUTES.ONBOARDING;
  }

  if (!onboardingData) {
    return ROUTES.ONBOARDING;
  }

  return ROUTES.DASHBOARD;
};
