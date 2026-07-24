/**
 * Monpolymet Group - Official Tender Poster PDF Generator
 * Generates a clean 1:1 Square Tender Poster PDF with non-bold, elegant, normal-sized Montserrat title typography.
 */

export function generateTenderPdf(tender) {
  if (!tender) return;

  const printWindow = window.open('', '_blank', 'width=1050,height=1050');
  if (!printWindow) {
    alert('Попап блоклогдсон байна. Браузерын цонх нээх зөвшөөрөл өгнө үү.');
    return;
  }

  const titleMn = typeof tender.title === 'object' ? tender.title?.mn : tender.title;
  const deadlineDateObj = tender.deadlineDate ? new Date(tender.deadlineDate) : new Date();
  const yearStr = deadlineDateObj.getFullYear();
  const monthStr = deadlineDateObj.getMonth() + 1;
  const dayStr = deadlineDateObj.getDate();
  const hoursStr = String(deadlineDateObj.getHours()).padStart(2, '0');
  const minutesStr = String(deadlineDateObj.getMinutes()).padStart(2, '0');

  const html = `
    <!DOCTYPE html>
    <html lang="mn">
    <head>
      <meta charset="UTF-8">
      <title>Тендерийн Зар Постер - ${tender.code || 'MONPOLYMET'}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Montserrat', sans-serif !important;
        }

        body {
          font-family: 'Montserrat', sans-serif !important;
          background: #e2e8f0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 30px;
          -webkit-font-smoothing: antialiased;
        }

        /* 1:1 Square Poster Container (1000px x 1000px for Facebook Post & PDF export) */
        .poster-card {
          width: 1000px;
          height: 1000px;
          position: relative;
          background-color: #ffffff;
          background-image: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.94) 0%, rgba(248, 250, 252, 0.90) 100%),
            url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 60px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        /* Header Bar */
        .poster-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          padding-bottom: 24px;
        }

        .poster-header-line {
          position: absolute;
          bottom: 0;
          left: 150px;
          right: 220px;
          height: 1px;
          background: #cbd5e1;
        }

        .brand-left {
          font-size: 20px;
          font-weight: 500;
          color: #0f172a;
          letter-spacing: -0.3px;
        }

        .brand-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-star {
          color: #001CE8;
          font-size: 20px;
          line-height: 1;
        }

        .brand-logo-text {
          font-size: 15px;
          font-weight: 500;
          color: #010B40;
          line-height: 1.1;
          letter-spacing: -0.2px;
        }

        .brand-logo-sub {
          font-size: 9.5px;
          font-weight: 500;
          color: #001CE8;
          letter-spacing: 1.2px;
        }

        /* Main Content Area */
        .poster-body {
          margin-top: 10px;
          margin-bottom: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px 0;
        }

        /* Code Pill Badge */
        .code-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #00c49f;
          border-left: 3px solid #00c49f;
          padding: 6px 16px;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          color: #0f172a;
          letter-spacing: 0.3px;
          margin-bottom: 20px;
          backdrop-filter: blur(8px);
          box-shadow: 0 2px 8px rgba(0, 196, 159, 0.1);
          width: fit-content;
        }

        /* Tender Main Title (Compact & Non-Bold) */
        .tender-title {
          font-size: 24px;
          font-weight: 500;
          color: #0f172a;
          line-height: 1.35;
          letter-spacing: 0;
          margin-bottom: 30px;
          max-width: 850px;
        }

        /* Details Grid */
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        .detail-item {
          position: relative;
        }

        .detail-item.with-accent {
          padding-left: 14px;
        }

        .detail-item.with-accent::before {
          content: '';
          position: absolute;
          left: 0;
          top: 3px;
          bottom: 3px;
          width: 3px;
          background: #00c49f;
          border-radius: 2px;
        }

        .detail-label {
          font-size: 13px;
          font-weight: 400;
          color: #64748b;
          margin-bottom: 4px;
        }

        .detail-value {
          font-size: 18px;
          font-weight: 500;
          color: #0f172a;
          line-height: 1.3;
        }

        /* Footer Section */
        .poster-footer {
          background: #ffffff;
          border-radius: 12px;
          padding: 16px 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
        }

        .footer-label {
          font-size: 12px;
          font-weight: 400;
          color: #64748b;
          margin-bottom: 2px;
        }

        .footer-val-link {
          font-size: 15px;
          font-weight: 500;
          color: #00c49f;
          text-decoration: none;
        }

        .footer-val-text {
          font-size: 15px;
          font-weight: 500;
          color: #0f172a;
        }

        @media print {
          body {
            background: none;
            padding: 0;
          }
          .poster-card {
            box-shadow: none;
            width: 1000px;
            height: 1000px;
            page-break-after: always;
          }
        }
      </style>
    </head>
    <body>
      <div class="poster-card">
        <!-- Header Top Bar -->
        <div class="poster-header">
          <div class="brand-left">TenderHub</div>
          <div class="poster-header-line"></div>
          <div class="brand-right">
            <div class="brand-star">✦</div>
            <div>
              <div class="brand-logo-text">МОНПОЛИМЕТ</div>
              <div class="brand-logo-sub">ГРУПП</div>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="poster-body">
          <!-- Code Badge -->
          <div class="code-badge">
            ${tender.code || 'THR26-2029278-000058'}
          </div>

          <!-- Main Title -->
          <h1 class="tender-title">
            ${titleMn || 'Шонгийн мод нийлүүлэх'}
          </h1>

          <!-- Details 2-Column Grid -->
          <div class="details-grid">
            <div class="detail-item">
              <div class="detail-label">Захиалагчийн нэр</div>
              <div class="detail-value">Монполимет ХХК</div>
            </div>

            <div class="detail-item with-accent">
              <div class="detail-label">Материал хүлээн авах хугацаа</div>
              <div class="detail-value">
                ${yearStr} оны ${monthStr} сарын ${dayStr}<br/>
                ${hoursStr} цаг ${minutesStr} минут
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="poster-footer">
          <div class="footer-col">
            <div class="footer-label">Вэбсайт</div>
            <div class="footer-val-link">www.TenderHub.mn</div>
          </div>

          <div class="footer-col">
            <div class="footer-label">И-мэйл</div>
            <div class="footer-val-text">procurement@monpolymet.mn</div>
          </div>

          <div class="footer-col">
            <div class="footer-label">Утас</div>
            <div class="footer-val-text">7000-9999 / 7585-5858</div>
          </div>
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
