#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Helper para delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function exportToPDF() {
  console.log('🚀 Iniciando exportação para PDF...');
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Configurar viewport para slides
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 2
    });
    
    // Array com todos os slides
    const slides = [];
    for (let i = 1; i <= 10; i++) {
      slides.push(`Slide_${String(i).padStart(2, '0')}.html`);
    }
    
    // Criar diretório de saída
    const distDir = path.join(__dirname, '..', 'dist');
    const screenshotsDir = path.join(distDir, 'screenshots');
    
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    const pdfPages = [];
    
    // Processar cada slide
    for (let i = 0; i < slides.length; i++) {
      const slideFile = slides[i];
      const slideNumber = i + 1;
      const filePath = `file://${path.join(__dirname, '..', slideFile)}`;
      
      console.log(`📄 Processando slide ${slideNumber}/10: ${slideFile}`);
      
      await page.goto(filePath, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });
      
      // Aguardar renderização completa
      await delay(1500);
      
      // Tirar screenshot
      const screenshotPath = path.join(screenshotsDir, `slide-${String(slideNumber).padStart(2, '0')}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false,
        clip: { x: 0, y: 0, width: 1280, height: 720 }
      });
      
      // Gerar PDF individual
      const pdfBuffer = await page.pdf({
        width: '1280px',
        height: '720px',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      });
      
      pdfPages.push(pdfBuffer);
    }
    
    // Navegar para index.html e exportar apresentação completa
    const indexPath = `file://${path.join(__dirname, '..', 'index.html')}`;
    await page.goto(indexPath, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    
    await delay(2000);
    
    // Exportar PDF da apresentação completa
    const finalPdfPath = path.join(distDir, 'slides.pdf');
    await page.pdf({
      path: finalPdfPath,
      width: '1280px',
      height: '720px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    console.log(`✅ PDF gerado com sucesso: ${finalPdfPath}`);
    console.log(`📸 Screenshots salvos em: ${screenshotsDir}`);
    
    // Gerar relatório
    const report = {
      pdf: finalPdfPath,
      screenshots: screenshotsDir,
      totalSlides: slides.length,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(distDir, 'export-report.json'),
      JSON.stringify(report, null, 2)
    );
    
  } catch (error) {
    console.error('❌ Erro na exportação:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

// Executar
exportToPDF().catch(console.error);