import StudentFaultService from '../services/StudentFaultService.js';
import StudentService from '../services/StudentService.js';
import PDFDocument from 'pdfkit-table';

export const generateFaultsPDF = async (req, res) => {
    const {groupId, startDate, endDate} = req.query;

    console.log('parametros: ', req.query)

    try {
        const faults = await StudentFaultService.get({groupId, startDate, endDate});

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

        const doc = new PDFDocument();

        doc.pipe(res);

        // crear nombre

        let title = 'Faltas de estudiantes';
        
        if (groupId) {
            const group = faults[0].student.group;

            const groupText = `${group.level} ${group.modality} ${group.section}`;

            title += ` de ${groupText}`;
        }
        if (startDate) {
            const [year, month, day] = startDate.split('-');
            title += ` desde ${day}/${month}/${year}`;
        }
        if (endDate) {
            const [year, month, day] = endDate.split('-')
            title += ` hasta ${day}/${month}/${year}`;
        }

        doc.fontSize(18).text(title);

        doc.moveDown(2);

        const table = {
            headers: ['Estudiante', 'Falta', 'Grupo'],
            rows: [],
        };

        faults.forEach(fault => {
            const student = fault.student;
            const group = student.group;
            const studentName = `${student.name} ${student.lastname}`;
            const faultDescription = fault.fault.description;
            const groupText = `${group.level} ${group.modality} ${group.section}`;

            table.rows.push([studentName, faultDescription, groupText])
        });


        doc.table(table, { 
            width: 500,
            prepareHeader: () => doc.fontSize(17),
            prepareRow: (row, i) => {
                doc.fontSize(15)
            },
            padding: 5
        }); 

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

export const generateStudentFaultsHistoryPDF = async (req, res) => {
    const {studentId} = req.params;
    const {startDate, endDate} = req.query;

    try {
        const faults = await StudentService.getFaults(studentId, {startDate, endDate});

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');

        const doc = new PDFDocument();

        doc.pipe(res);

        // crear nombre

        const student = faults[0].student;
        const group = student.group;
        const groupText = `${group.level} ${group.modality} ${group.section}`;

        let title = `Faltas de ${student.name} ${student.lastname} de ${groupText}`;
        
        if (startDate) {
            title += ` desde ${startDate}`;
        }
        if (endDate) {
            title += ` hasta ${endDate}`
        }

        doc.fontSize(18).text(title);

        doc.moveDown(2);

        const table = {
            headers: ['Falta', 'Fecha y Hora'],
            rows: [],
        };

        faults.forEach(fault => {
            const faultDescription = fault.fault.description;

            table.rows.push([faultDescription, fault.timestamp]);
        });


        doc.table(table, { 
            width: 500,
            prepareHeader: () => doc.fontSize(17),
            prepareRow: (row, i) => {
                doc.fontSize(15)
            },
            padding: 5
        }); 

        doc.end();

    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
};

export default {
    generateFaultsPDF,
    generateStudentFaultsHistoryPDF
}