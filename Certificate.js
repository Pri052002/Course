import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './Certificate.css'; // Add custom styling here

const Certificate = ({ courseTitle }) => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Fetch the username from localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleDownload = () => {
        const input = document.getElementById('certificate');
        html2canvas(input).then((canvas) => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 190; // Adjust width according to your layout
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('certificate.pdf');
        });
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#f8f9fa' }}>
            <div id="certificate" className="border rounded p-5 bg-white shadow" style={{ width: '80%', maxWidth: '700px' }}>
                <h1 className="text-center text-primary mb-4">Certificate of Completion</h1>
                <p className="text-center" style={{ fontSize: '1.2rem' }}>This is to certify that</p>
                <h2 className="text-center text-success font-weight-bold my-3">
                    {username || 'Your Name'}
                </h2>
                <p className="text-center" style={{ fontSize: '1.2rem' }}>has successfully completed the course</p>
                <h3 className="text-center text-primary font-weight-bold mb-4">
                    "Artificial Intelligence"
                </h3>
                <p className="text-center" style={{ fontStyle: 'italic', color: '#666' }}>Congratulations on your achievement!</p>
                <p className="text-center" style={{ color: '#999' }}>Issued on: {new Date().toLocaleDateString()}</p>
                <div className="text-center">
                    <Button variant="primary" onClick={handleDownload} className="mt-4" style={{ padding: '10px 20px', borderRadius: '25px' }}>
                        Download Certificate
                    </Button>
                </div>
            </div>
        </Container>
    );
};

export default Certificate;
