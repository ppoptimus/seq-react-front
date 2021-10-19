import React from 'react'
import pdfMake from "pdfmake/build/pdfmake"; 
import pdfFonts from "pdfmake/build/vfs_fonts"; 
pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    THSarabunNew: {
      normal: 'THSarabunNew.ttf',
      bold: 'THSarabunNew-Bold.ttf',
      italics: 'THSarabunNew-Italic.ttf',
      bolditalics: 'THSarabunNew-BoldItalic.ttf'
    },
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
  }

export default function Test() {
    const printPDF = () => {
        var docDefinition = {
            content: [
              { text: 'สวัสดีประเทศไทย reat pdf demo 1234 ', fontSize: 15 },
            ],
            defaultStyle:{
              font: 'THSarabunNew'
            }
          };
          pdfMake.createPdf(docDefinition).open()
    }
    return (
        <div>
            <input type="button" defaultValue="print PDF" onClick={printPDF} />
        </div>
    )
}
