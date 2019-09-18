import {
	Typography,
  	Card,
} from 'antd';
import React, { useState, useEffect, Fragment, forwardRef, useRef } from 'react';
import {sys,log,req} from '@/lib/sys';
import QRCode from 'qrcode';

const { Text, Title } = Typography;

export default (props) => {
	const { id } = props.match.params;

	const canvasRef = useRef(null);

    const [ticket, setTicket] = useState({img:[],city:[],price:0});
    const [order, setOrder] = useState({});

	useEffect(()=>{
	    if(id){
	      req('/api/order/read_e_ticket',{id}).then(r=>{
	        setTicket(r.ticket);
	        setOrder(r.order);
	        QRCode.toCanvas(canvasRef.current, r.order._id, {width:240},e=>e&&console.log(e));
	      }).catch(log);
	    }
	},[]);
	return (
		<Card>
			<div className="fx-col -o-">
			<Title level={3}>{ticket.name}</Title>
			<div>{ticket.comment}</div>
			<div style={{height:'10px'}}></div>
			<Text code>预订人：&nbsp;{order.client_name}&nbsp;&nbsp;&nbsp;{order.client_mobile}</Text>
			<canvas ref={canvasRef}></canvas>
			<Text type="danger">*为了便于验票，可截图保存，请勿泄露于他人</Text>
			</div>
		</Card>
	);
}