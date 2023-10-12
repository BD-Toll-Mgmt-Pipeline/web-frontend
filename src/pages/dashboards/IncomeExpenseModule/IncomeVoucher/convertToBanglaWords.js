export const convertToBanglaWords = (amount) => {
    const ones = ['', 'এক', 'দুই', 'তিন', 'চার', 'পাঁচ', 'ছয়', 'সাত', 'আট', 'নয়'];
    const teens = ['এগারো', 'বারো', 'তেরো', 'চোদ্দ', 'পনের', 'ষোল', 'সতের', 'আঠারো', 'উনিশ'];
    const tweens = ['একুশ', 'বাইশ', 'তেরো', 'চোদ্দ', 'পনের', 'ষোল', 'সতের', 'আঠারো', 'উনিশ'];
    const tens = [
      '',
      'দশ',
      'বিশ',
      'তিরিশ',
      'চুরাশি',
      'পঁচাশি',
      'ছাপ্পান্ন',
      'সাতাশি',
      'আশি',
      'নব্বই',
    ];
  
    const numToBanglaWords = (num) => {
      if (num === 0) return 'শূন্য';
      if (num < 10) return ones[num];
      if (num < 20) return teens[num - 11];
      if (num < 30) return tweens[num - 11];
      if (num < 100)
        return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + ones[num % 10] : '');
      if (num < 1000)
        return (
          ones[Math.floor(num / 100)] +
          ' শত' +
          (num % 100 !== 0 ? ' ' + numToBanglaWords(num % 100) : '')
        );
      if (num < 100000)
        return (
          numToBanglaWords(Math.floor(num / 1000)) +
          ' হাজার' +
          (num % 1000 !== 0 ? ' ' + numToBanglaWords(num % 1000) : '')
        );
      if (num < 10000000)
        return (
          numToBanglaWords(Math.floor(num / 100000)) +
          ' লাখ' +
          (num % 100000 !== 0 ? ' ' + numToBanglaWords(num % 100000) : '')
        );
      return 'অসীম সংখ্যা';
    };
  
    return numToBanglaWords(amount);
  };
  