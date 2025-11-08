import { ThreeMonthConsultationDetail } from '@utils/constants'
import React from 'react'
import LineItem from './line-item'

const ThreeMonthConsult = () => {
  return (
    <>
      <LineItem consultationDetail={ThreeMonthConsultationDetail} setCartItemPopupProductId={() => {}} setIsConsultClick={() => {}}/>
    </>
  )
}

export default ThreeMonthConsult