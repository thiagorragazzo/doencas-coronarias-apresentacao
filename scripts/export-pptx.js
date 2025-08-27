#!/usr/bin/env node

const PptxGenJS = require('pptxgenjs');
const { JSDOM } = require('jsdom');
const fs = require('fs').promises;
const path = require('path');

async function exportToPPTX() {
  console.log('🎯 Iniciando exportação para PPTX...');
  
  const pptx = new PptxGenJS();
  
  // Configurar apresentação
  pptx.author = 'Projeto de Extensão V';
  pptx.company = 'Turma 5º Semestre B';
  pptx.title = 'Doenças Coronarianas - CID-10 I20-I25';
  pptx.subject = 'Medicina - Cardiologia';
  
  // Layout personalizado (16:9)
  pptx.defineLayout({ name: 'CUSTOM', width: 10, height: 5.625 });
  pptx.layout = 'CUSTOM';
  
  // Processar cada slide
  for (let i = 1; i <= 10; i++) {
    const slideFile = `Slide_${String(i).padStart(2, '0')}.html`;
    const filePath = path.join(__dirname, '..', slideFile);
    
    console.log(`📊 Processando slide ${i}/10: ${slideFile}`);
    
    try {
      const html = await fs.readFile(filePath, 'utf-8');
      const dom = new JSDOM(html);
      const document = dom.window.document;
      
      // Extrair metadados
      const slideNumber = document.querySelector('meta[name="slide-number"]')?.content || String(i);
      const slideLayout = document.querySelector('meta[name="slide-layout"]')?.content || 'TITLE_AND_CONTENT';
      const transition = document.querySelector('meta[name="pptx-transition"]')?.content || 'fade';
      
      // Criar slide
      const slide = pptx.addSlide();
      
      // Background escuro
      slide.background = { color: '0F172A' };
      
      // Extrair título
      const title = document.querySelector('h1')?.textContent || 
                   document.querySelector('.title')?.textContent || 
                   `Slide ${i}`;
      
      // Adicionar título
      slide.addText(title, {
        x: 0.5,
        y: 0.3,
        w: 9,
        h: 0.8,
        fontSize: 28,
        bold: true,
        color: 'FFFFFF',
        align: 'center',
        fontFace: 'Arial'
      });
      
      // Extrair subtítulo
      const subtitle = document.querySelector('.sub')?.textContent || 
                      document.querySelector('.subtitle')?.textContent || '';
      
      if (subtitle) {
        slide.addText(subtitle, {
          x: 0.5,
          y: 0.9,
          w: 9,
          h: 0.4,
          fontSize: 14,
          color: '94A3B8',
          align: 'center',
          fontFace: 'Arial'
        });
      }
      
      // Extrair conteúdo principal
      const contentElements = document.querySelectorAll('.card, .panel, .block, .item');
      let yPos = 1.8;
      
      contentElements.forEach((element, idx) => {
        if (idx > 3) return; // Limitar quantidade de elementos
        
        const text = element.textContent?.trim().slice(0, 200) || '';
        if (text) {
          slide.addText(text, {
            x: 0.5,
            y: yPos,
            w: 9,
            h: 0.8,
            fontSize: 12,
            color: 'E2E8F0',
            align: 'left',
            fontFace: 'Arial',
            bullet: true
          });
          yPos += 0.9;
        }
      });
      
      // Adicionar número do slide
      slide.addText(`${slideNumber}`, {
        x: 9.2,
        y: 5.2,
        w: 0.5,
        h: 0.3,
        fontSize: 10,
        color: '64748B',
        align: 'center'
      });
      
      // Adicionar transição (se suportado)
      if (transition === 'fade') {
        slide.transition = { type: 'fade', duration: 0.5 };
      } else if (transition === 'slide') {
        slide.transition = { type: 'push', duration: 0.8 };
      }
      
    } catch (error) {
      console.error(`⚠️ Erro ao processar ${slideFile}:`, error.message);
    }
  }
  
  // Salvar PPTX
  const outputPath = path.join(__dirname, '..', 'dist', 'slides.pptx');
  
  try {
    await pptx.writeFile({ fileName: outputPath });
    console.log(`✅ PPTX gerado com sucesso: ${outputPath}`);
  } catch (error) {
    console.error('❌ Erro ao salvar PPTX:', error);
    process.exit(1);
  }
}

// Executar
exportToPPTX().catch(console.error);