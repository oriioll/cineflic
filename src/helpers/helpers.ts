/**
 * Converts a month number into its spanish written version
 * @param monthNumber The number of the month you want to convert to string
 * @returns The month written in spanish
 * @author Oriol Plazas Leon
 * @since 04/04/2026
 */
export const getSpanishWrittenMonth = (monthNumber: number): string => {
  let writtenMonth = ''
  switch (monthNumber) {
    case 1:
      writtenMonth = 'Enero'
      break
    case 2:
      writtenMonth = 'Febrero'
      break
    case 3:
      writtenMonth = 'Marzo'
      break
    case 4:
      writtenMonth = 'Abril'
      break
    case 5:
      writtenMonth = 'Mayo'
      break
    case 6:
      writtenMonth = 'Junio'
      break
    case 7:
      writtenMonth = 'Julio'
      break
    case 8:
      writtenMonth = 'Agosto'
      break
    case 9:
      writtenMonth = 'Septiembre'
      break
    case 10:
      writtenMonth = 'Octubre'
      break
    case 11:
      writtenMonth = 'Noviembre'
      break
    case 12:
      writtenMonth = 'Diciembre'
      break
    default:
      writtenMonth = 'Enero'
  }
  return writtenMonth
}
