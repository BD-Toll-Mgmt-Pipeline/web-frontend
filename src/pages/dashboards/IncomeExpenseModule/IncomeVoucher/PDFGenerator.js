import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

const PDFGenerator = ({ voucherData }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>{`Voucher Data: ${JSON.stringify(voucherData)}`}</Text>
          <Text>{" kndfs fkdsndfkjnsdfjndf"}</Text>

        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});


PDFGenerator.propTypes = {
  voucherData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    // Add more prop types as needed
  }).isRequired,
};

export default PDFGenerator;
