import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { StudentTransportInfo, SCHOOL_CONTACTS } from '../types';

export async function downloadStudentPassPdf(
  student: StudentTransportInfo,
  sourceElement?: HTMLElement | null
): Promise<void> {
  // If a source DOM element is provided, render it directly
  let targetElement: HTMLElement;
  let isTemp = false;

  if (sourceElement) {
    targetElement = sourceElement;
  } else {
    // Create an offscreen, beautifully styled printable card
    isTemp = true;
    targetElement = document.createElement('div');
    targetElement.dir = 'rtl';
    targetElement.style.position = 'fixed';
    targetElement.style.top = '-9999px';
    targetElement.style.left = '-9999px';
    targetElement.style.width = '680px';
    targetElement.style.backgroundColor = '#FFFFFF';
    targetElement.style.color = '#16324A';
    targetElement.style.padding = '36px';
    targetElement.style.fontFamily = "'Cairo', 'Tajawal', sans-serif";
    targetElement.style.borderRadius = '16px';
    targetElement.style.border = '2px solid #E4DCC9';
    targetElement.style.boxSizing = 'border-box';

    const busNum = student.bus_number && student.bus_number.toString().trim() ? student.bus_number : '—';

    targetElement.innerHTML = `
      <div style="text-align: center; border-bottom: 2px solid #E8A33D; padding-bottom: 18px; margin-bottom: 24px;">
        <div style="font-size: 14px; font-weight: 700; color: #C77F1F; margin-bottom: 4px;">سلطنة عُمان — وزارة التربية والتعليم</div>
        <h2 style="font-size: 26px; font-weight: 800; color: #16324A; margin: 0 0 6px;">مدرسة أنس بن مالك الخاصة</h2>
        <div style="display: inline-block; background: #16324A; color: #E8A33D; padding: 6px 20px; border-radius: 999px; font-weight: 700; font-size: 15px;">
          بطاقة خط سير وتصريح النقل المدرسي
        </div>
      </div>

      <div style="display: flex; gap: 24px; align-items: center; background: #FBF7EF; border: 1.5px solid #E4DCC9; border-radius: 14px; padding: 20px; margin-bottom: 24px;">
        <div style="flex-shrink: 0; width: 100px; height: 100px; background: #16324A; border-radius: 14px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #E8A33D; border: 2px solid #0E2434;">
          <span style="font-size: 38px; font-weight: 900; line-height: 1;">${busNum}</span>
          <span style="font-size: 12px; color: #CBD8E0; margin-top: 4px;">رقم الحافلة</span>
        </div>
        <div style="flex: 1;">
          <div style="font-size: 13px; color: #5C6B75; margin-bottom: 2px;">اسم الطالب ثلاثي / رباعي:</div>
          <h3 style="font-size: 22px; font-weight: 800; color: #16324A; margin: 0 0 6px;">${student.name}</h3>
          <div style="font-size: 14px; font-weight: 600; color: #C77F1F;">
            ${student.grade ? `الصف الدراسي: ${student.grade}` : 'مسجل بحافلات المدرسة'}
          </div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
        <tbody>
          <tr style="border-bottom: 1px solid #E4DCC9;">
            <td style="padding: 10px 12px; color: #5C6B75; width: 35%; font-weight: 600;">رقم الحافلة المخصصة:</td>
            <td style="padding: 10px 12px; color: #16324A; font-weight: 800; font-size: 16px;">حافلة رقم (${busNum})</td>
          </tr>
          <tr style="border-bottom: 1px solid #E4DCC9;">
            <td style="padding: 10px 12px; color: #5C6B75; font-weight: 600;">السائق المسؤول:</td>
            <td style="padding: 10px 12px; color: #16324A; font-weight: 700;">${student.driver_name || 'غير محدد'}</td>
          </tr>
          <tr style="border-bottom: 1px solid #E4DCC9;">
            <td style="padding: 10px 12px; color: #5C6B75; font-weight: 600;">المشرف / المشرفة:</td>
            <td style="padding: 10px 12px; color: #16324A; font-weight: 700;">${student.supervisor_name || 'طاقم الإشراف المدرسي'}</td>
          </tr>
          ${student.station ? `
          <tr style="border-bottom: 1px solid #E4DCC9;">
            <td style="padding: 10px 12px; color: #5C6B75; font-weight: 600;">نقطة التجمع / المحطة:</td>
            <td style="padding: 10px 12px; color: #16324A; font-weight: 700;">${student.station}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 10px 12px; color: #5C6B75; font-weight: 600;">مسؤول الحافلات المدرسية:</td>
            <td style="padding: 10px 12px; color: #16324A; font-weight: 700;">${SCHOOL_CONTACTS.busCoordinator.name} (${SCHOOL_CONTACTS.busCoordinator.phone})</td>
          </tr>
        </tbody>
      </table>

      <div style="background: #FDF4E4; border: 1px dashed #E8A33D; border-radius: 10px; padding: 12px; font-size: 12px; color: #7A4B0A; margin-bottom: 24px; line-height: 1.6;">
        <strong>تنبيه لولي الأمر والسائق:</strong> يُرجى التواجد في نقطة التجمع قبل موعد الحافلة بـ 10 دقائق. في حالة أي استفسار أو طوارئ يتم التواصل مباشرة مع إدارة النقل المدرسي.
      </div>

      <div style="display: flex; justify-content: space-between; align-items: flex-end; padding-top: 14px; border-top: 2px solid #E4DCC9; font-size: 13px;">
        <div>
          <div style="font-weight: 700; color: #16324A;">إعداد: ${SCHOOL_CONTACTS.portalDev.name}</div>
          <div style="color: #5C6B75; font-size: 11px; margin-top: 2px;">تاريخ الاستخراج: ${new Date().toLocaleDateString('ar-OM', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <div style="text-align: left;">
          <div style="font-weight: 700; color: #16324A;">مديرة المدرسة: ${SCHOOL_CONTACTS.principal.name}</div>
          <div style="color: #059669; font-size: 12px; font-weight: 700; margin-top: 2px;">✓ معتمد إلكترونيًا</div>
        </div>
      </div>
    `;
    document.body.appendChild(targetElement);
  }

  try {
    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      logging: false,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Center on page with margins
    const margin = 12;
    const finalWidth = pdfWidth - margin * 2;
    const finalHeight = (canvas.height * finalWidth) / canvas.width;

    pdf.addImage(imgData, 'JPEG', margin, margin, finalWidth, finalHeight);
    
    const safeName = student.name.replace(/[/\\?%*:|"<>]/g, '-').trim();
    pdf.save(`بطاقة_حافلة_${safeName || 'طالب'}.pdf`);
  } finally {
    if (isTemp && targetElement.parentNode) {
      targetElement.parentNode.removeChild(targetElement);
    }
  }
}
