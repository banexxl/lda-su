import numeral from 'numeral';

// ----------------------------------------------------------------------

type InputValue = string | number | null;

export const extractStringFromUrl = (inputValue: string) => {
  const pdfRegex = /\/([^\/]+)\.pdf$/;
  const docxRegex = /\/([^\/]+)\.docx$/;

  const pdfMatch = inputValue.match(pdfRegex);
  const docxMatch = inputValue.match(docxRegex);

  if (pdfMatch && pdfMatch[1]) {
    return pdfMatch[1]; // Found a match for PDF
  } else if (docxMatch && docxMatch[1]) {
    return docxMatch[1]; // Found a match for DOCX
  } else {
    return null; // No match found for PDF or DOCX
  }
};


export const extractFileName = (url: string) => {
  const parts = url.split('/');
  return parts[parts.length - 1]; // Get the last part (file name)
};


export const extractNameFromUrl = (url: string) => {
  const regex = /^https?:\/\/(?:www\.)?([^/]+)\.\w+\/?/;
  const match = url.match(regex);
  if (match && match.length > 1) {
    return match[1];
  }
  return ''; // Return empty string if the match is not found
};
