import { useEffect, useState } from 'react';
import { Container, Select } from '@chakra-ui/react'
import { getBucket } from '@extend-chrome/storage';


interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

export const Popup = () => {
  document.body.style.width = '20rem';
  document.body.style.height = '20rem';

  const [lang, setLang] = useState('')
  
  const saveLang = (lang: string) => {
    bucket.set({ targetLang: lang });
    setLang(lang);
  };

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.targetLang) {
        setLang(value.targetLang);
      }
    })();
  }, []);
  
  return (
    <Container p="xl">
      <Select placeholder='Select option' value={lang} onChange={(e) => saveLang(e.target.value)}>
        <option value='EN'>英語</option>
        <option value='ZH'>中国語</option>
        <option value='JA'>日本語</option>
      </Select>
    </Container>
  );
};
