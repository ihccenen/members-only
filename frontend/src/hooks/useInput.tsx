import { useState } from 'react';

export default function useInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {value, handleChange};
}
