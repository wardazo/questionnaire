
const x = 'aFXXdpbzEwpI7zEbQMt8'
async function generatePDF(htmlContent) {
    try {
        const response = await fetch('https://api.docraptor.com/docs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(x + ':')}`
            },
            body: JSON.stringify({
                doc: {
                    test: true,
                    document_content: htmlContent,
                    name: 'output.pdf',
                    document_type: 'pdf'
                }
            })
        });

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.pdf';
        link.click();

        URL.revokeObjectURL(url);
        return url;
    } catch (error) {
        throw new Error(`PDF generation failed: ${error.message}`);
    }
}

export default generatePDF;
