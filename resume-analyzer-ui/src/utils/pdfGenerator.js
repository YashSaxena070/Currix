import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDFBlob = async (element, options = {}) => {
  if (!element) throw new Error('Element not found');

  const canvas = await html2canvas(element, {
    scale: options.scale || 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff', // Ensure white background
  });

  const imgData = canvas.toDataURL('image/jpeg', options.quality || 0.8);
  
  // Calculate PDF dimensions to match canvas (or standard A4 if preferred, but matching canvas is safer for custom layouts)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
  return pdf.output('blob');
};
