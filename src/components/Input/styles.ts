import { GLOBALS } from '@/Constants/Globals';
import { COLORS } from '@/Theme/Colors';

export const stylesInput = {
  baseContainer: ({
    scaleHorizontal,
    scaleVertical,
  }: {
    scaleVertical: (val: number) => number;
    scaleHorizontal: (val: number) => number;
  }) => ({
    borderRadius: GLOBALS.BORDER_RADIUS,
    borderWidth: 1,
    paddingHorizontal: scaleHorizontal(16),
    paddingVertical: scaleVertical(16),
  }),
  placeholderStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.GREY_600,
  },
  selectedTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.BLACK,
  },
  bordered: {
    borderWidth: 2,
    borderColor: COLORS.YELLOW,
  },
  error: {
    borderWidth: 2,
    borderColor: COLORS.RED,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    borderRadius: 15,
  },
  dropdown: {
    borderRadius: GLOBALS.BORDER_RADIUS,
    borderWidth: 2,
    borderColor: COLORS.YELLOW,
    marginTop: -1.5,
  },
  itemTextStyle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: COLORS.BLACK,
    flex: 1,
    height: 42,
  },
  disabled: {
    backgroundColor: COLORS.GREY_200,
    borderColor: COLORS.GREY_300,
  },
};
