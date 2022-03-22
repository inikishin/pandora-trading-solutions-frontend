export const regression_line_angle_8 = 'regression_line_angle_8';

export const RegressionLineAngleInterpreter = (featuresCodes, feature) => {
  const featureIndex = featuresCodes.findIndex(item => (item === regression_line_angle_8));
  const featureValue = feature[featureIndex];

  return `Линия тренда, построенная за последние 8 дней, направлена ${featureValue >= 0 ? 'вверх' : 'вниз'}. Угол ее наклона составляет ${featureValue.toFixed(1)} градусов.`;
}
