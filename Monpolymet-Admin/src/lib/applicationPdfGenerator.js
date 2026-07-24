/**
 * Monpolymet Group - Official Candidate Application PDF Generator
 * Generates an official, print-ready corporate Candidate Application Document PDF with clean, non-bold typography.
 */

export function generateApplicationPdf(app) {
  if (!app) return;

  const printWindow = window.open('', '_blank', 'width=950,height=1050');
  if (!printWindow) {
    alert('Попап блоклогдсон байна. Браузерын цонх нээх зөвшөөрөл өгнө үү.');
    return;
  }

  const dateStr = app.createdAt ? new Date(app.createdAt).toLocaleDateString('mn-MN') : '2026.07.24';

  const html = `
    <!DOCTYPE html>
    <html lang="mn">
    <head>
      <meta charset="UTF-8">
      <title>Ажилд Орох Анкет - ${app.name || 'Сонгон шалгаруулалт'}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          font-family: 'Montserrat', sans-serif !important;
        }

        body {
          font-family: 'Montserrat', sans-serif !important;
          margin: 0;
          padding: 32px;
          color: #0f172a;
          background: #ffffff;
          -webkit-font-smoothing: antialiased;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid #001CE8;
          padding-bottom: 14px;
          margin-bottom: 20px;
        }

        .logo-title {
          font-size: 17px;
          font-weight: 500;
          color: #010B40;
          letter-spacing: -0.2px;
        }

        .logo-sub {
          font-size: 10.5px;
          color: #001CE8;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .doc-code {
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          color: #1d4ed8;
          padding: 5px 12px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 11.5px;
        }

        .applicant-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 16px 18px;
          border-radius: 8px;
          margin-bottom: 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .applicant-name {
          font-size: 16px;
          font-weight: 500;
          color: #010B40;
          margin: 0 0 3px 0;
        }

        .applicant-pos {
          font-size: 12px;
          font-weight: 400;
          color: #001CE8;
          margin: 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 18px;
        }

        .info-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          padding: 8px 12px;
          border-radius: 6px;
        }

        .info-label {
          font-size: 10px;
          font-weight: 400;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .info-val {
          font-size: 12px;
          font-weight: 500;
          color: #1e293b;
        }

        .section-h {
          font-size: 13px;
          font-weight: 500;
          color: #010B40;
          margin: 16px 0 6px 0;
          border-left: 3px solid #001CE8;
          padding-left: 8px;
        }

        .desc-text {
          font-size: 12px;
          line-height: 1.6;
          color: #334155;
          white-space: pre-line;
          background: #fafafa;
          border: 1px solid #f1f5f9;
          padding: 12px;
          border-radius: 6px;
          font-weight: 400;
        }

        .footer-stamp {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid #e2e8f0;
          padding-top: 14px;
        }

        .stamp-box {
          border: 1px dashed #001CE8;
          padding: 10px 16px;
          border-radius: 6px;
          text-align: center;
          color: #001CE8;
          font-size: 10.5px;
          font-weight: 500;
        }

        @media print {
          body { padding: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo-title">МОНПОЛИМЕТ ГРУПП</div>
          <div class="logo-sub">Ажилд Орох Анкет & Хүсэлтийн Баримт</div>
        </div>
        <div class="doc-code">
          ОГНОО: ${dateStr}
        </div>
      </div>

      <div class="applicant-box">
        <div>
          <h1 class="applicant-name">${app.name || 'Ажил горилогч'}</h1>
          <p class="applicant-pos">Өгсөн албан тушаал: ${app.position || 'Ерөнхий анкет'}</p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 10px; font-weight: 400; color: #64748b; display: block; margin-bottom: 2px;">АНКЕТЫН ТӨЛӨВ</span>
          <span style="background: #dbeafe; color: #1e40af; padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: 500;">
            ${app.status || 'Шинэ'}
          </span>
        </div>
      </div>

      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Холбоо Барих Утас</div>
          <div class="info-val">${app.phone || '-'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">И-мэйл Хаяг</div>
          <div class="info-val">${app.email || '-'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Мэргэжил</div>
          <div class="info-val">${app.profession || 'Мэдээлээгүй'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Өмнө нь ажиллаж байсан байгууллага</div>
          <div class="info-val">${app.previousCompany || 'Мэдээлээгүй'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Хүсэж буй цалингийн хүлээлт</div>
          <div class="info-val">${app.expectedSalary || 'Мэдээлээгүй'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Ажилд орох боломжтой хугацаа</div>
          <div class="info-val">${app.availableDate || 'Шууд орох боломжтой'}</div>
        </div>
      </div>

      <div class="section-h">1. АЖИЛ ГОРИЛОГЧИЙН ТӨРӨЛ БА ӨПӨӨРЛИЙН МЭДЭЭЛЭЛ / ТАНИЛЦУУЛГА</div>
      <div class="desc-text">${app.message || app.introMessage || 'Тусгай тайлбар оруулаагүй байна.'}</div>

      <div class="section-h">2. ХҮНИЙ НӨӨЦИЙН АЛБАНЫ ШҮҮЛТ БА ТЭМДЭГЛЭЛ</div>
      <div style="border: 1px dashed #cbd5e1; height: 70px; border-radius: 6px; padding: 8px; color: #94a3b8; font-size: 10px; font-weight: 400;">
        [ Энд ярилцлагын тэмдэглэл болон шийдвэрийг гараар тэмдэглэнэ ]
      </div>

      <div class="footer-stamp">
        <div>
          <p style="font-size: 10.5px; color: #64748b; margin: 0; font-weight: 400;">Монполимет Групп - Хүний Нөөцийн Хэлтэс</p>
          <p style="font-size: 10.5px; font-weight: 500; color: #0f172a; margin: 2px 0 0 0;">Утас: 75855858 /1007/ | Имэйл: mpm-hr@monpolymet.mn</p>
        </div>
        <div class="stamp-box">
          МОНПОЛИМЕТ ГРУПП<br/>
          ХҮНИЙ НӨӨЦИЙН АЛБА<br/>
          [ СУДАЛСАН ]
        </div>
      </div>

      <script>
        document.fonts.ready.then(function() {
          setTimeout(function() {
            window.print();
          }, 350);
        });
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
