import { useState } from 'react';

export const useSmsCodeCountdown = () => {
  const [countdown, setCountdown] = useState(0);
  const [timer, setTimer] = useState<any>(null);

  const handleRun = (num: number) => {
    setCountdown(num);
    clearTimeout(timer);
    if (num > 0) {
      setTimer(setTimeout(() => handleRun(num - 1), 1000));
    }
  };

  return [
    {
      countdown,
      disabled: countdown > 0,
      formatText: countdown ? `重新获取(${countdown})` : '获取验证码',
    },
    handleRun,
  ];
};
