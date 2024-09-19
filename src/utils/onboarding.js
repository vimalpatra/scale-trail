export const checkOnboardingStatus = () => {
  if (typeof window !== 'undefined') {
    const onboardingData = localStorage.getItem('onboardingData');
    return onboardingData ? JSON.parse(onboardingData) : null;
  }
  return null;
};

export const saveOnboardingData = (data) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('onboardingData', JSON.stringify(data));
  }
};
