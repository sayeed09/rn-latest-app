import { HorizontalCardT1Style } from '@components/product-cards/horizontal-card/style'
import { OneMonthConsultationDetail } from '@utils/constants'
import React from 'react'
import { View } from 'react-native'
import LineItem from './line-item'

interface IProps {
  setCartItemPopupProductId?: (value: string | boolean) => void;
  setIsConsultClick?: (value: boolean) => void;
}
const OneMonthConsult = ({ setCartItemPopupProductId, setIsConsultClick }: IProps) => {
  return (
    <View style={[HorizontalCardT1Style.PrimeProductCard]}>
      <LineItem consultationDetail={OneMonthConsultationDetail} setCartItemPopupProductId={setCartItemPopupProductId} setIsConsultClick={setIsConsultClick}/>
    </View>
  )
}

export default OneMonthConsult