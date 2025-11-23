import React from 'react';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import SubCategoryPage1 from './SubCategoryPage1';
import SubCategoryPage2 from './SubCategoryPage2';
import SubCategoryPage3 from './SubCategoryPage3';
import SubCategoryPage4 from './SubCategoryPage4';

const decrypt = (encryptedText: string) => {
  const secretKey = 'your-secret-key'; // Replace with your actual secret key
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const SubCategoryHandler: React.FC = () => {
  const {
    encryptedCategoryId,
    encryptedSubCategoryId,
    encryptedCategoryName,
    encryptedSubCategoryName
  } = useParams<{
    encryptedCategoryId: string;
    encryptedSubCategoryId: string;
    encryptedCategoryName: string;
    encryptedSubCategoryName: string;
  }>();

  const categoryId = decrypt(encryptedCategoryId || '');
  const subCategoryId = decrypt(encryptedSubCategoryId || '');
  const categoryName = decrypt(encryptedCategoryName || '');
  const subCategoryName = decrypt(encryptedSubCategoryName || '');

  if (subCategoryName === 'Double') {
// @ts-ignore
return <SubCategoryPage1 category={categoryName} subCategory={subCategoryName} categoryId={categoryId} subCategoryId={subCategoryId} />;
  } else if (subCategoryName === 'Harup') {
    return <SubCategoryPage2 category={categoryName} subCategory={subCategoryName} categoryId={categoryId} subCategoryId={subCategoryId} />;
  } else if (subCategoryName === 'Crossing') {
// @ts-ignore
return <SubCategoryPage3 category={categoryName} subCategory={subCategoryName} categoryId={categoryId} subCategoryId={subCategoryId} />;
  } else if (subCategoryName === 'Jantri') {
// @ts-ignore
return <SubCategoryPage4 category={categoryName} subCategory={subCategoryName} categoryId={categoryId} subCategoryId={subCategoryId} />;
  }

  return <div>Subcategory not found!</div>;
};

export default SubCategoryHandler;
