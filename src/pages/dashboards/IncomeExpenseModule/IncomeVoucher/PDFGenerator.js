import React from 'react';
import { PDFViewer, Document, Page, Text } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const PDFGenerator = ({ voucherData }) => {
  return (
    <PDFViewer>
      <Document>
        <Page>
          <Text>{voucherData.name}</Text>
          {/* You can add more text and content here */}
        </Page>
      </Document>
    </PDFViewer>
  );
};

PDFGenerator.propTypes = {
  voucherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // Add more prop types as needed
  }).isRequired,
};

export default PDFGenerator;
