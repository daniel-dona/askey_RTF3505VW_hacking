function $$(ele) {
	return typeof ele == 'string' ? document.getElementById(ele) : ele;
}

function trim(str)
{
	return str.replace(/(^\s*)|(\s*$)/g, "");	
}

function disableTextField (field) {
	if (document.all || document.getElementById)
		field.disabled = true;
	else {
		field.oldOnFocus = field.onfocus;
		field.onfocus = skip;
	}
}

function enableTextField (field) {
	if (document.all || document.getElementById)
		field.disabled = false;
	else {
		field.onfocus = field.oldOnFocus;
	}
}

///ql_xu add
function Lan1NeqLan2(ip1, mask1, ip2, mask2)
{
	d11 = getDigit(ip1.value,1);
	d12 = getDigit(mask1.value, 1);
	d21 = getDigit(ip2.value,1);
	d22 = getDigit(mask2.value,1);
	d1 = d11 & d12;
	d2 = d21 & d22;
	if (d1 != d2)
		return true;
	
	d11 = getDigit(ip1.value,2);
	d12 = getDigit(mask1.value, 2);
	d21 = getDigit(ip2.value,2);
	d22 = getDigit(mask2.value,2);
	d1 = d11 & d12;
	d2 = d21 & d22;
	if (d1 != d2)
		return true;

	d11 = getDigit(ip1.value,3);
	d12 = getDigit(mask1.value, 3);
	d21 = getDigit(ip2.value,3);
	d22 = getDigit(mask2.value,3);
	d1 = d11 & d12;
	d2 = d21 & d22;
	if (d1 != d2)
		return true;

	d11 = getDigit(ip1.value,4);
	d12 = getDigit(mask1.value, 4);
	d21 = getDigit(ip2.value,4);
	d22 = getDigit(mask2.value,4);
	d1 = d11 & d12;
	d2 = d21 & d22;
	if (d1 != d2)
		return true;

	return false;
}

function disableRadioGroup (radioArrOrButton)
{
  if (radioArrOrButton.type && radioArrOrButton.type == "radio") {
        var radioButton = radioArrOrButton;
        var radioArray = radioButton.form[radioButton.name];
  }
  else
        var radioArray = radioArrOrButton;
        radioArray.disabled = true;
        for (var b = 0; b < radioArray.length; b++) {
        if (radioArray[b].checked) {
                radioArray.checkedElement = radioArray[b];
                break;
        }
  }
  for (var b = 0; b < radioArray.length; b++) {
        radioArray[b].disabled = true;
        radioArray[b].checkedElement = radioArray.checkedElement;
  }
}

function enableRadioGroup (radioArrOrButton)
{
  if (radioArrOrButton.type && radioArrOrButton.type == "radio") {
        var radioButton = radioArrOrButton;
        var radioArray = radioButton.form[radioButton.name];
  }
  else
        var radioArray = radioArrOrButton;

  radioArray.disabled = false;
  radioArray.checkedElement = null;
  for (var b = 0; b < radioArray.length; b++) {
        radioArray[b].disabled = false;
        radioArray[b].checkedElement = null;
  }
}

function disableCheckBox (checkBox) {
  if (!checkBox.disabled) {
    checkBox.disabled = true;
    if (!document.all && !document.getElementById) {
      checkBox.storeChecked = checkBox.checked;
      checkBox.oldOnClick = checkBox.onclick;
      checkBox.onclick = preserve;
    }
  }
}

function enableCheckBox (checkBox)
{
  if (checkBox.disabled) {
    checkBox.disabled = false;
    if (!document.all && !document.getElementById)
      checkBox.onclick = checkBox.oldOnClick;
  }
}


function check_wps_enc(enc, radius, auth)
{
        if (enc == 0 || enc == 1) {
                if (radius != 0)
                        return 2;
        }
        else {
                if (auth & 1)
                        return 2;
        }
        return 0;
}

function check_wps_wlanmode(mo, type)
{
        if (mo == 2) {
                return 1;
        }
        if (mo == 1 && type != 0) {
                return 1;
        }
        return 0;
}


function getDigit(str, num)
{
  i=1;
  if ( num != 1 ) {
  	while (i!=num && str.length!=0) {
		if ( str.charAt(0) == '.' ) {
			i++;
		}
		str = str.substring(1);
  	}
  	if ( i!=num )
  		return -1;
  }
  for (i=0; i<str.length; i++) {
  	if ( str.charAt(i) == '.' ) {
		str = str.substring(0, i);
		break;
	}
  }
  if ( str.length == 0)
  	return -1;
  d = parseInt(str, 10);
  return d;
}

function getDigitforMac(str, num)
{
  i=1;
  if ( num != 1 ) {
  	while (i!=num && str.length!=0) {
		if ( str.charAt(0) == '-' ) {
			i++;
		}
		str = str.substring(1);
  	}
  	if ( i!=num )
  		return -1;
  }
  for (i=0; i<str.length; i++) {
  	if ( str.charAt(i) == '-' ) {
		str = str.substring(0, i);
		break;
	}
  }
  if ( str.length == 0)
  	return -1;
  d = parseInt(str, 10);
  return d;
}

function validateKey(str)
{
   str=trim(str);
   for (var i=0; i<str.length; i++) {
    if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
    		(str.charAt(i) == '.' ) )
			continue;
	return 0;
  }
  return 1;
}

function validateDigit(str)
{
	if ((str.charAt(0) == '0') && ((str.charAt(1) == 'x') || (str.charAt(1) == 'X')))
	{//hex
		for (var i=2; i<str.length; i++)
		{
			if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') || 
				(str.charAt(i) >= 'A' && str.charAt(i) <= 'F')||
				(str.charAt(i) >= 'a' && str.charAt(i) <= 'f') )
				continue;
			return 0;
		}
	} else {//octet
		for (var i=2; i<str.length; i++)
		{
			if ( str.charAt(i) >= '0' && str.charAt(i) <= '9')
				continue;
			return 0;
		}
	}
	return 1;
}

function validateDecimalDigit(str)
{
	for (var i=0; i<str.length; i++)
	{
		if ( str.charAt(i) >= '0' && str.charAt(i) <= '9')
			continue;
		return 0;
	}
	return 1;
}

function getDigitFromString(str)
{
	var d;
	
	if ( str.length == 0)
		return -1;

	if ((str.charAt(0) == '0') && ((str.charAt(1) == 'x') || (str.charAt(1) == 'X')))
		d = parseInt(str, 16);
	else
		d = parseInt(str, 10);
	
	return d;
}


function validateKey2(str)
{
   for (var i=0; i<str.length; i++) {
    if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
    		(str.charAt(i) == '-' ) || 
    		(str.charAt(i) >= 'A' && str.charAt(i) <= 'F')||
    		(str.charAt(i) >= 'a' && str.charAt(i) <= 'f') )
			continue;
	return 0;
  }
  return 1;
}

function IsLoopBackIP(str)
{
	d = getDigit(str,1);
	if(d==127)
		return 1;
	return 0;
}

function checkDigitRange(str, num, min, max)
{
  d = getDigit(str,num);
  if ( d > max || d < min )
      	return false;
  return true;
}

function checkDigitRangeforMac(str, num, min, max)
{  
  d = getDigitforMac(str,num);
  if ( d > max || d < min )
      	return false;
  return true;
}

function checkIP(ip)
{
	ip.value=trim(ip.value);
	if (ip.value=="") {
		alertSpecial("El campo Direcci&oacute;n IP no puede estar vac&iacute;o. Debe contener 4 n&uacute;meros con el siguiente formato : XXX.XXX.XXX.XXX");
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	//This is modified by wangrong at 2007-12-27
	var str=ip.value;
	var count=0;
	for (var i=0; i<str.length; i++) 
	{
		if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') )
			continue;
		if (str.charAt(i) == '.')
		{
			count++;
			continue;
		}
		alertSpecial("Direcci&oacute;n IP no v&aacute;lida. Debe ser un n&uacute;mero decimal (0-9).");
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if(count!=3)
	{
		alertSpecial("Direcci&oacute;n IP no v&aacute;lida. Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
		ip.focus();
		return false;
	}
	
	if( IsLoopBackIP( ip.value)==1 ) {
		alertSpecial("Direcci&oacute;n IP no v&aacute;lida.");
		ip.value = ip.defaultValue;	// Jenny,  Buglist B058, backward default value
		ip.focus();
		return false;
	}
	
	if ( !checkDigitRange(ip.value,1,1,223) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 1er d&iacute;gito. Debe ser un valor entre 1-223.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if ( !checkDigitRange(ip.value,2,0,255) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 2&ordm; d&iacute;gito. Debe ser un valor entre 0-255.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if ( !checkDigitRange(ip.value,3,0,255) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 3er d&iacute;gito. Debe ser un valor entre 0-255.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if ( !checkDigitRange(ip.value,4,1,254) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 4&ordm; d&iacute;gito. Debe ser un valor entre 1-254.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	//Zeon, 20171026, RM11518
	if ( checkDigitRange(ip.value,1,192,192) && checkDigitRange(ip.value,2,168,168) && checkDigitRange(ip.value,3,2,2) && checkDigitRange(ip.value,4,1,1) ) {
		alertSpecial('Rango direcci&oacute;n IP(192.168.2.1) no v&aacute.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	
	return true;
}

function checkNotEmptyIP(ip)
{
	if (ip.value=="") {
		
		return true;
	}
	//This is modified by wangrong at 2007-12-27
	var str=ip.value;
	var count=0;
	for (var i=0; i<str.length; i++) 
	{
		if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') )
			continue;
		if (str.charAt(i) == '.')
		{
			count++;
			continue;
		}
		alertSpecial("Direcci&oacute;n IP no v&aacute;lida. Debe ser un n&uacute;mero decimal (0-9).");
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if(count!=3)
	{
		alertSpecial("Direcci&oacute;n IP no v&aacute;lida. Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
		ip.focus();
		return false;
	}
	
	if( IsLoopBackIP( ip.value)==1 ) {
		alertSpecial("Direcci&oacute;n IP no v&aacute;lida.");
		ip.value = ip.defaultValue;	// Jenny,  Buglist B058, backward default value
		ip.focus();
		return false;
	}
	
	if ( !checkDigitRange(ip.value,1,1,223) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 1er d&iacute;gito. Debe ser un valor entre 1-223.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if ( !checkDigitRange(ip.value,2,0,255) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 2&ordm; d&iacute;gito. Debe ser un valor entre 0-255.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if ( !checkDigitRange(ip.value,3,0,255) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 3er d&iacute;gito. Debe ser un valor entre 0-255.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	if ( !checkDigitRange(ip.value,4,1,254) ) {
		alertSpecial('Rango direcci&oacute;n IP no v&aacute;lido en el 4&ordm; d&iacute;gito. Debe ser un valor entre 1-254.');
		ip.value = ip.defaultValue;
		ip.focus();
		return false;
	}
	
	return true;
}

//check if ip1 and ip2 is in the same network and ip1 is less ip2
function checkNetwork(ip1,ip2)
{
  ip_n = getDigit(ip1, 1);
  ip1_1 = getDigit(ip1,1);
  ip1_2 = getDigit(ip1,2);
  ip1_3 = getDigit(ip1,3);
  ip1_4 = getDigit(ip1,4);
  ip2_1 = getDigit(ip2,1);
  ip2_2 = getDigit(ip2,2);
  ip2_3 = getDigit(ip2,3);
  ip2_4 = getDigit(ip2,4);
  if(ip_n>=1 && ip_n<=126) 
  {
  	if(ip1_1 != ip2_1 || ip1_2>ip2_2 || (ip1_2==ip2_2 && ip1_3>ip2_3) ||(ip1_2==ip2_2 && ip1_3==ip2_3 && ip1_4>ip2_4)){
  		alertSpecial("La direcci&oacute;n de comienzo debe ser menor que la direcci&oacute;n final.");
  		return false;
  }
  }
  else if(ip_n>=128 && ip_n<=191)
  {
  	if(ip1_1!=ip2_1 || ip1_2!=ip2_2 || ip1_3>ip2_3 || (ip1_3==ip2_3 && ip1_4>ip2_4)){
  		alertSpecial("La direcci&oacute;n de comienzo debe ser menor que la direcci&oacute;n final.");
  		return false;
  }
  }
  else if(ip_n>=192 && ip_n<=223)
   {
  	if(ip1_1!=ip2_1 || ip1_2!=ip2_2 || ip1_3!=ip2_3 || ip1_4>ip2_4){
  		alertSpecial("La direcci&oacute;n de comienzo debe ser menor que la direcci&oacute;n final.");
  		return false;
  }
  }
  else{
        return false;
  }

  return true;
}

function checkMask(netmask)
{
 	 var str = new Array("", "1st", "2nd", "3rd", "4th");
	var i, d;
	var s,m;
	if (netmask.value=="") {
		alertSpecial("&iexcl;M&aacute;scara de subred no puede estar vac&iacute;a! Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
		netmask.value = netmask.defaultValue;
		netmask.focus();
		return false;
	}
	
	//This is modified by wangrong at 2007-12-27
	var str2=netmask.value;
	var count=0;
	for (i=0; i<str2.length; i++) 
	{
		if ( (str2.charAt(i) >= '0' && str2.charAt(i) <= '9')  )
			continue;
		if (str2.charAt(i) == '.')
		{
			count++;
			continue;
		}
		alertSpecial("M&aacute;scara de subred no v&aacute;lida. Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
			netmask.focus();
			return false;
		}
	if(count!=3)
	{
		alertSpecial("M&aacute;scara de subred no v&aacute;lida. Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
		netmask.focus();
		return false;
	}

//Zeon, 20171026, RM11519
	if(getDigit(netmask.value,1) == 255 && getDigit(netmask.value,2) == 255 && getDigit(netmask.value,3) == 255)
	{
		if(getDigit(netmask.value,4) >= 128)
		{
			alertSpecial('M&aacute;scara no permitida.');
			netmask.focus();
			return false;
		}
		else if(getDigit(netmask.value,4) != 0)
		{
			alertSpecial('M&aacute;scara de subred no v&aacute;lida 4th digit.\nDebe ser un n&uacute;mero 0');
			netmask.focus();
			return false;
		}
		else
		{
			return true;
		}
	}
	else	//End RM11519
	{
		for (i=1; i<=4; i++) 
		{
			d = getDigit(netmask.value,i);		
			if( !(d==0 || d==128 || d==192 || d==224 || d==240 || d==248 || d==252 || d==254 || d==255 )) {
				alertSpecial('M&aacute;scara de subred no v&aacute;lida '+str[i]+' digit.\nDebe ser un n&uacute;mero 0, 128, 192, 224, 240, 248, 252 ?254');
				netmask.focus();
				return false;
			}
			if(d!=255)
			{	
				for(m=i+1;m<=4;m++)
				{
					s=getDigit(netmask.value,m);
					if(s!=0)
					{
						alertSpecial('&iexcl;M&aacute;scara de subred no v&aacute;lida!');
						netmask.focus();
						return false;
					}
				}
				return true;
			}
		}
	}
	return true;
}


function checkMaskSpecial(netmask) 
{
	 var str = new Array("", "1st", "2nd", "3rd", "4th");
	 var str2=netmask.value;
	 var i, d;
	  var s,m;
	  var count=0;
	  var d1,d2,d3,d4;
	  if (netmask.value=="") {
		alertSpecial("&iexcl;M&aacute;scara de subred no puede estar vac&iacute;a! Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
		netmask.value = netmask.defaultValue;
		netmask.focus();
		return false;
	}
	for (i=0; i<str2.length; i++) 
	{
		if ( (str2.charAt(i) >= '0' && str2.charAt(i) <= '9')  )
			continue;
		if (str2.charAt(i) == '.')
		{
			count++;
			continue;
		}
		alertSpecial("M&aacute;scara de subred no v&aacute;lida. Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
			netmask.focus();
			return false;
		}
	if(count!=3)
	{
		alertSpecial("M&aacute;scara de subred no v&aacute;lida. Deben ser 4 d&iacute;gitos de la forma xxx.xxx.xxx.xxx.");
		netmask.focus();
		return false;
	}

	d1 = getDigit(netmask.value,1);
	d2 = getDigit(netmask.value,2);
	d3 = getDigit(netmask.value,3);
	d4 = getDigit(netmask.value,4);
	if((d1==0)&&(d2==0)&&(d3==0)&&(d4==0))
	{	
		alertSpecial("M&aacute;scara de subred no v&aacute;lida. No debe ser 0.0.0.0.");
		netmask.focus();
		return false;
	}
	if((d1==255)&&(d2==255)&&(d3==255)&&(d4==255))
	{	
		alertSpecial("M&aacute;scara de subred no v&aacute;lida. no debe ser 255.255.255.255.");
		netmask.focus();
		return false;
	}
	
	for (i=1; i<=4; i++) 
	{
		d = getDigit(netmask.value,i);		
		if( !(d==0 || d==128 || d==192 || d==224 || d==240 || d==248 || d==252 || d==254 || d==255 )) {
			alertSpecial('M&aacute;scara de subred no v&aacute;lida '+str[i]+' digit.\nDebe ser un n&uacute;mero 0, 128, 192, 224, 240, 248, 252 ?254');
			netmask.focus();
			return false;
		}
		
		if(d!=255)
		{	
			for(m=i+1;m<=4;m++)
			{
				s=getDigit(netmask.value,m);
				if(s!=0)
				{
					alertSpecial('&iexcl;M&aacute;scara de subred no v&aacute;lida!');
					netmask.focus();
					return false;
				}
			}
			return true;
		}
		
	}

	return true;
}

function includeSpace(str)
{
  for (var i=0; i<str.length; i++) {
  	if ( str.charAt(i) == ' ' ) {
	  return true;
	}
  }
  return false;
}

function checkString(str)
{
	for (var i=0; i<str.length; i++) {
		if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') || (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') ||
		   (str.charAt(i) == '.') || (str.charAt(i) == ':') || (str.charAt(i) == '-') || (str.charAt(i) == '_') || (str.charAt(i) == ' ') || (str.charAt(i) == '/') || (str.charAt(i) == '@'))
			continue;
		return 0;
	}
	return 1;
}

function deleteClick()
{
	if ( !confirmSpecial('&iquest;Desea borrar la entrada seleccionada?') ) {
		return false;
	}
	else
		return true;
}
        
function deleteAllClick()
{
	if ( !confirmSpecial('&iquest;Desea borrar todas las entradas?') ) {
		return false;
	}
	else
		return true;
}

function delClick(index)
{
	if ( !confirmSpecial('&iquest;Est?seguro que desea borrar?') ) {
		return false;
	}
	
	document.actionForm.action.value=0;
	document.actionForm.idx.value=index;
	document.actionForm.submit();
	return true;
}


function delClick2(index,connid)
{
	if ( !confirmSpecial('&iquest;Est?seguro que desea borrar?') ) {
		return false;
	}
	
	document.actionForm.action.value=0;
	document.actionForm.idx.value=index;
	document.actionForm.connid.value=connid; 
	document.actionForm.submit();
	return true;
}


function editClick(index)
{
	document.actionForm.action.value=1;
	document.actionForm.idx.value=index;
	document.actionForm.submit();
	return true;
}
function editClick2(index, connid)
{
     document.actionForm.action.value=1;
     document.actionForm.idx.value=index;
     document.actionForm.connid.value=connid; 
     document.actionForm.submit();
     return true;

}

function verifyBrowser() {
	var ms = navigator.appVersion.indexOf("MSIE");
	ie4 = (ms>0) && (parseInt(navigator.appVersion.substring(ms+5, ms+6)) >= 4);
	var ns = navigator.appName.indexOf("Netscape");
	ns= (ns>=0) && (parseInt(navigator.appVersion.substring(0,1))>=4);
	if (ie4)
		return "ie4";
	else
		if(ns)
			return "ns";
		else
			return false;
}

function isBrowser(b,v) {
	browserOk = false;
	versionOk = false;
	
	browserOk = (navigator.appName.indexOf(b) != -1);
	if (v == 0) versionOk = true;
	else  versionOk = (v <= parseInt(navigator.appVersion));
	return browserOk && versionOk;
}

function disableButton (button) {
  if (document.all || document.getElementById)
    button.disabled = true;
  else if (button) {
    button.oldOnClick = button.onclick;
    button.onclick = null;
    button.oldValue = button.value;
    button.value = 'DISABLED';
  }
}

function disableButtonIB (button) {
	if (isBrowser('Netscape', 0))
	{
		button.disabled = true;
		return;
	}
	if (document.all || document.getElementById)
		button.disabled = true;
	else if (button) {
		button.oldOnClick = button.onclick;
		button.onclick = null;
		button.oldValue = button.value;
		button.value = 'DISABLED';
	}
}

function disableButtonVB (button) {
  if (verifyBrowser() == "ns")
  	return;
  if (document.all || document.getElementById)
    button.disabled = true;
  else if (button) {
    button.oldOnClick = button.onclick;
    button.onclick = null;
    button.oldValue = button.value;
    button.value = 'DISABLED';
  }
}

function enableButton (button) {
  if (document.all || document.getElementById)
    button.disabled = false;
  else if (button) {
    button.onclick = button.oldOnClick;
    button.value = button.oldValue;
  }
}

function enableButtonVB (button) {
  if (verifyBrowser() == "ns")
  	return;
  if (document.all || document.getElementById)
    button.disabled = false;
  else if (button) {
    button.onclick = button.oldOnClick;
    button.value = button.oldValue;
  }
}

function enableButtonIB (button) {
	if (isBrowser('Netscape', 4))
	{	button.disabled = false;
		return;
	}
	if (document.all || document.getElementById)
		button.disabled = false;
	else if (button) {
		button.onclick = button.oldOnClick;
		button.value = button.oldValue;
	}
}

//This function is added by jim at 20090626
function checkFormatUnicastMac(macaddr)
{
	var str = macaddr.value;
	if ( str.length < 17)
	{
		alertSpecial("Direcci&oacute;n MAC introducida incompleta. Ej. xx:xx:xx:xx:xx:xx");
		macaddr.focus();
		return false;
	}

	if(str == "00:00:00:00:00:00")
	{
	        alertSpecial("Direcci&oacute;n MAC no v&aacute;lida. No puede ser todo '0'");
	        return false;
	 }
	var count=0;
	for (var i=0; i<str.length; i++) 
	{
		if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
			(str.charAt(i) >= 'a' && str.charAt(i) <= 'f') ||
			(str.charAt(i) >= 'A' && str.charAt(i) <= 'F') )
			continue;
		if (str.charAt(i) == ':')
		{
			count++;
			continue;
		}
		alertSpecial("Direcci&oacute;n MAC no v&aacute;lida. Debe ser un n&uacute;mero hexadecimal (0-9 ?a-f). Ej. xx:xx:xx:xx:xx:xx");
		macaddr.focus();
		return false;
	}
	
	if(count!=5)
	{
		alertSpecial("Direcci&oacute;n MAC no v&aacute;lida. Debe ser un n&uacute;mero hexadecimal (0-9 ?a-f). Ej. xx:xx:xx:xx:xx:xx");
		macaddr.focus();
		return false;
	}
	if(str.charAt(1)&1)
	{
		alertSpecial("&iexcl;MAC de Broadcast/Multicast no es v&aacute;lida!");
		macaddr.focus();
		return false;
	}
	return true;
}

//This function is added by wangrong at 2007-12-25
function checkMac(macaddr)
{
	var str = macaddr.value;
	if ( str.length < 17)
	{
		alertSpecial("Direcci&oacute;n MAC introducida incompleta. Ej. xx:xx:xx:xx:xx:xx");
		macaddr.focus();
		return false;
	}

	if(str == "00:00:00:00:00:00")
	{
	        alertSpecial("Direcci&oacute;n MAC no v&aacute;lida. No puede ser todo '0'");
		return false;
	}
	var count=0;
	for (var i=0; i<str.length; i++) 
	{
		if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
			(str.charAt(i) >= 'a' && str.charAt(i) <= 'f') ||
			(str.charAt(i) >= 'A' && str.charAt(i) <= 'F') )
			continue;
		if (str.charAt(i) == ':')
		{
			count++;
			continue;
	}
		alertSpecial("Direcci&oacute;n MAC no v&aacute;lida. Debe ser un n&uacute;mero hexadecimal (0-9 ?A-F). Ej. XX:XX:XX:XX:XX:XX");
		macaddr.focus();
		return false;
	}

	if(count!=5)
	{
		alertSpecial("Direcci&oacute;n MAC no v&aacute;lida. Debe ser un n&uacute;mero hexadecimal (0-9 ?A-F). Ej. XX:XX:XX:XX:XX:XX");
		macaddr.focus();
		return false;
	}
	return true;
}
//modified by ramen 20090605-exclude the broadcast&multicast
function checkMacWithoutColon(macAddr, checkEmpty)
{
	var i, macdigit = 0;

	if (checkEmpty == 1 && macAddr.value.length == 0) {
		//alertSpecial("MAC address cannot be empty");
		return false;
	}
	if(!checkEmpty&& macAddr.value.length == 0)
		return true;
	//tony 20111202 add: all zero mac is invalid
	var allZeroPattern = /^[0]{12}$/;
	if (allZeroPattern.exec(macAddr.value)) return false  ; 
	//tony 20111202 end
	var macPattern=/^[0-9a-fA-F]{1}[02468aAcCeE]{1}[0-9a-fA-F]{10}$/;
	if (!macPattern.exec(macAddr.value)) return false  ; 
	var broadcastpattern=/^[fF]{12}$/;
	if (broadcastpattern.exec(macAddr.value)) return false  ; 
	return true;
}
function routeClick(url)
{
	var wide=600;
	var high=400;
	if (document.all)
		var xMax = screen.width, yMax = screen.height;
	else if (document.layers)
		var xMax = window.outerWidth, yMax = window.outerHeight;
	else
	   var xMax = 640, yMax=480;
	var xOffset = (xMax - wide)/2;
	var yOffset = (yMax - high)/3;

	var settings = 'width='+wide+',height='+high+',screenX='+xOffset+',screenY='+yOffset+',top='+yOffset+',left='+xOffset+', resizable=yes, toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes';

	window.open( url, 'RouteTbl', settings );
}
//add by ramen
//type=1:at least one character
//type=0:may be empty
function checkSpecialChar(str,type)
{
		str=trim(str);
		var patrn;
		if(type)
			patrn=/^[a-zA-Z0-9~`!@#$%^&*()_+|\\{}[\]:;<?,-./=']+$/; 

		else
			patrn=/^[a-zA-Z0-9~`!@#$%^&*()_+|\\{}[\]:;<?,-./=']*$/; 

		if (!patrn.exec(str)) return false  ; 
		if(str.indexOf("  ",0)!=-1)
			return false;
		return true;	
}
function checkEmail(str)
{
	var emailReg=/^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (!emailReg.exec(str)) return false  ; 
	return true;
}

function isFQDN(str)
{
   return /^(([a-z]|[a-z][\w\-]*[\w])\.)*([a-z]|[a-z][\w\-]*[\w])$/i.test(str);
}

// IPv4 functions
function isIPv4(str)
{
    return /^(([01]?\d\d?|2[0-4]\d|25[0-5])[.]?){4}$/.test(str) &&
           /^\d{1,3}(\.\d{1,3}){3}$/.test(str);
}

function isIPv4Mask(str)
{
    if (!isIPv4(str)) return false;

    var ipnum = strIP2Num(str);
    while ((ipnum&0x80000000) != 0) ipnum <<= 1;
    return (ipnum == 0);
}

function strIP2Num(str)
{
    var ip = str.split('.');
    return (ip[0]<<24) | (ip[1]<<16) | (ip[2]<<8) | ip[3];
}

function numIP2Str(ipnum)
{
    return (ipnum>>>24).toString() +'.'+ (ipnum>>>16&0xff) +'.'+ (ipnum>>>8&0xff) +'.'+ (ipnum&0xff);
}

function replaceNetID(src, dst, msk)
{
    if (!isIPv4(src) || !isIPv4(dst) || !isIPv4Mask(msk)) return '';

    var srcnum = strIP2Num(src);
    var dstnum = strIP2Num(dst);
    var msknum = strIP2Num(msk);

    dstnum = (msknum & srcnum) | (~msknum & dstnum);
    return numIP2Str(dstnum);
}

function getNetID(ip, msk)
{
    if (!isIPv4(ip) || !isIPv4Mask(msk)) return '';

    var ipnum = strIP2Num(ip);
    var msknum = strIP2Num(msk);

    return numIP2Str(msknum & ipnum);
}

function getFirstIP(ip, msk)
{
    if (!isIPv4(ip) || !isIPv4Mask(msk)) return '';

    var ipnum = strIP2Num(ip);
    var msknum = strIP2Num(msk);
    var firstip = (ipnum & msknum) + 1;
    return numIP2Str(firstip);
}

function getBroadcastIP(ip, msk)
{
    if (!isIPv4(ip) || !isIPv4Mask(msk)) return '';

    var ipnum = strIP2Num(ip);
    var msknum = strIP2Num(msk);
    var bcip = (ipnum & msknum) | (~msknum);
    return numIP2Str(bcip);
}

//star:20100825 IPV6_RELATED
function isIPv6(str)  
{  
return str.match(/:/g).length<=7  
&&/::/.test(str)  
?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)  
:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str);  
} 
 
 function isNumber(value)
{
	return /^\d+$/.test(value);
}

function ParseIpv6Array(str)
{
    var Num;
    var i,j;
    var finalAddrArray = new Array();
    var falseAddrArray = new Array();
    
    var addrArray = str.split(':');
    Num = addrArray.length;
    if (Num > 8)
    {
        return falseAddrArray;
    }

    for (i = 0; i < Num; i++)
    {
        if ((addrArray[i].length > 4) 
            || (addrArray[i].length < 1))
        {
            return falseAddrArray;
        }
        for (j = 0; j < addrArray[i].length; j++)
        {
            if ((addrArray[i].charAt(j) < '0')
                || (addrArray[i].charAt(j) > 'f')
                || ((addrArray[i].charAt(j) > '9') && 
                (addrArray[i].charAt(j) < 'a')))
            {
                return falseAddrArray;
            }
        }

        finalAddrArray[i] = '';
        for (j = 0; j < (4 - addrArray[i].length); j++)
        {
            finalAddrArray[i] += '0';
        }
        finalAddrArray[i] += addrArray[i];
    }

    return finalAddrArray;
}

function getFullIpv6Address(address)
{
    var c = '';
    var i = 0, j = 0, k = 0, n = 0;
    var startAddress = new Array();
    var endAddress = new Array();
    var finalAddress = '';
    var startNum = 0;
    var endNum = 0;
    var lowerAddress;
    var totalNum = 0;

    lowerAddress = address.toLowerCase();
 
    var addrParts = lowerAddress.split('::');
    if (addrParts.length == 2)
    {
        if (addrParts[0] != '')
        {
            startAddress = ParseIpv6Array(addrParts[0]);
            if (startAddress.length == 0)
            {
                return '';
            }
        }
        if (addrParts[1] != '')
        {
            endAddress = ParseIpv6Array(addrParts[1]);
            if (endAddress.length == 0)
            {
               return '';
            }
        }

        if (startAddress.length +  endAddress.length >= 8)
        {
            return '';
        }
    }
    else if (addrParts.length == 1)
    {
        startAddress = ParseIpv6Array(addrParts[0]);
        if (startAddress.length != 8)
        {
            return '';
        }
    }
    else
    {
        return '';
    }

    for (i = 0; i < startAddress.length; i++)
    {
        finalAddress += startAddress[i];
        if (i != 7)
        {
            finalAddress += ':';
        }
    }
    for (; i < 8 - endAddress.length; i++)
    {
        finalAddress += '0000';
        if (i != 7)
        {
            finalAddress += ':';
        }
    }
    for (; i < 8; i++)
    {
        finalAddress += endAddress[i - (8 - endAddress.length)];
        if (i != 7)
        {
            finalAddress += ':';
        }
    }

    return finalAddress;
    
}

function isIpv6Address(address)
{
    if (getFullIpv6Address(address) == '')
    {
        return false;
    }
    
    return true;
}


function isUnicastIpv6Address(address)
{
    var tempAddress = getFullIpv6Address(address);
    
    if ((tempAddress == '')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0000')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0001')
        || (tempAddress.substring(0, 2) == 'ff'))
    {
        return false;
    }
    
    return true;
}

function isGlobalIpv6Address(address)
{
    var tempAddress = getFullIpv6Address(address);
    
    if ((tempAddress == '')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0000')
        || (tempAddress == '0000:0000:0000:0000:0000:0000:0000:0001')
        || (tempAddress.substring(0, 3) == 'fe8')
        || (tempAddress.substring(0, 3) == 'fe9')
        || (tempAddress.substring(0, 3) == 'fea')
        || (tempAddress.substring(0, 3) == 'feb')
        || (tempAddress.substring(0, 2) == 'ff'))
    {
        alertSpecial("inv&aacute;lida direcci&oacute;n IPv6 global");
        return false;
    }
    
    return true;
}

function isLinkLocalIpv6Address(address)
{
    var tempAddress = getFullIpv6Address(address);
    
    if ( (tempAddress.substring(0, 3) == 'fe8')
        || (tempAddress.substring(0, 3) == 'fe9')
        || (tempAddress.substring(0, 3) == 'fea')
        || (tempAddress.substring(0, 3) == 'feb'))
    {
        return true;
    }
    
    return false;
}

function attentionDisplay(a) 
{		
	var attention = parent.document.getElementById('attention');
	if(a==1){
		attention.style.display="block";
	}else{
		attention.style.display="none";
	}
};
//star:20100825 IPV6_RELATED END

function checkSpecialCharForURL(str,type)
{		
	var patrn;		
	if(type)
		patrn=/^[a-zA-Z0-9~`!@$^*()_|\\{}[\]:;<,-.']+$/; 		
	else			
		patrn=/^[a-zA-Z0-9~`!@$^*()_|\\{}[\]:;<,-.']*$/; 		
	if (!patrn.exec(str)) 
		return false  ; 		
	if(str.indexOf("  ",0)!=-1)			
		return false;		
	return true;	
}

function checkSpecialCharExcludeSpace(str,type)
{		
	var patrn;
	if(type)
		patrn=/^[a-zA-Z0-9!#$%&()*+,-./:;=@[\]^_`{|}~<> ]+$/;
	else		
		patrn=/^[a-zA-Z0-9!#$%&()*+,-./:;=@[\]^_`{|}~<> ]*$/;
	if (!patrn.exec(str)) 
		return false  ; 				
	if(str.indexOf("  ",0)!=-1)			
		return false;		
	if(str.indexOf(" ",0)==0 || str.lastIndexOf(" ")==(str.length-1))		
	{			
		return false;		
	}			
	return true;
}
function checkSSIDValid(str)
{
	var singlebyte = /[\x20-\x7e]/;
	var doublebyte = /[\xb4\xb7\xb8\xc0\xc1\xc2\xc3\xc7\xc8\xc9\xca\xcc\xcd\xce\xd1\xd2\xd3\xd5\xd6\xd9\xda\xdb\xdc\xe0\xe1\xe2\xe3\xe7\xe8\xe9\xea\xec\xed\xee\xf1\xf2\xf3\xf5\xf6\xf9\xfa\xfb\xfc]/;
	var triplebyte = /[\x80\u20ac]/;
	var length = 0;
	if (str.length > 0) {
		for (var i=0; i<str.length; i++) {
			var chr = str.charAt(i);
			if (singlebyte.test(chr))
				length+=1;
			else if (doublebyte.test(chr))
				length+=2;
			else if (triplebyte.test(chr))
				length+=3;
			else {
				alertSpecial('&iexcl;SSID contiene caracteres no v&aacute;lidos!');
				return false;
			}
		}
	}

	if (length==0 || length>32) {
		alertSpecial('SSID no v&aacute;lido. &iexcl;Longitud m&iacute;nima permitida es de 1 caracteres y &iexcl;longitud m&aacute;xima permitida es de 32 caracteres!');
		return false;
	}
	return true;
}
function getSSIDLength(str)
{
	var singlebyte = /[\x20-\x7e]/;
	var doublebyte = /[\xb4\xb7\xb8\xc0\xc1\xc2\xc3\xc7\xc8\xc9\xca\xcc\xcd\xce\xd1\xd2\xd3\xd5\xd6\xd9\xda\xdb\xdc\xe0\xe1\xe2\xe3\xe7\xe8\xe9\xea\xec\xed\xee\xf1\xf2\xf3\xf5\xf6\xf9\xfa\xfb\xfc]/;
	var triplebyte = /[\x80\u20ac]/;
	var length = 0;
	if (str.length > 0) {
		for (var i=0; i<str.length; i++) {
			var chr = str.charAt(i);
			if (singlebyte.test(chr))
				length+=1;
			else if (doublebyte.test(chr))
				length+=2;
			else if (triplebyte.test(chr))
				length+=3;
			else {
				length++;
			}
		}
	}
	return length;
}

function checkPhoneNum(number){
	var validPattern=/^[\d]{9}$/;
	if(validPattern.test(number.value)){
		return true;
	}
	else{
		alertSpecial('El n&uacute;mero de telef&oacute;no es err&oacute;neo, debes introducir un n&uacute;mero de tel&eacute;fono con nueve digitos.');
		return false;
	}
}
function checknotequalsubnet(ipvalue,gwvalue,netmask){
	var mask = netmask.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
	var mdigits = mask[0].split('.');
	var startip = ipvalue.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
	var stdigits = startip[0].split('.');
	var gwip = gwvalue.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
	var gwdigits = gwip[0].split('.');
	for( i=0 ; i<4 ; i++)
	{
		if((mdigits[i] & stdigits[i]) != (mdigits[i] & gwdigits[i]))
		{
			//alertSpecial("lan y la direcci&oacute;n IP deben estar en la misma subred");                                                        
			return false;
		}
	}
	return true;		
}
function inValidNetAddr(Address,Mask)
{
  var address = Address.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var mask = Mask.match("^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$");
  var bMask = 0;
  var bIp = 0;
  	
  Ipdigits = address[0].split(".");
  Maskdigits = mask[0].split(".");

  for(i=0; i < 4; i++)
  {
  	bIp = (bIp << 8) | Ipdigits[i];
  	bMask = (bMask << 8) | Maskdigits[i];
  }

  bIp = bIp & 0x0FFFFFFFF;
  bMask = bMask & 0x0FFFFFFFF;
  bMask = ~bMask & 0x0FFFFFFFF;
  if(((bIp & bMask) == bMask) || ((bIp & bMask) == 0))
  {
  	alertSpecial("Invalid Ip And NetMask " + " " + Address + ' & ' + Mask);
  	return false;
  }
  
  return true;
}

function checklessthan(start,end){
    var startIp = start.split(".");
    var endIp = end.split(".");
    var stIP = parseInt(startIp[0])<<24 | parseInt(startIp[1])<<16 | parseInt(startIp[2])<<8 | parseInt(startIp[3]);
    var edIP = parseInt(endIp[0])<<24 | parseInt(endIp[1])<<16 | parseInt(endIp[2])<<8 | parseInt(endIp[3]);
    stIP = stIP >>> 0;
    edIP = edIP >>> 0;  
    if( stIP >= edIP )
    {
      alertSpecial("La Direcci&oacute;n final debe ser mayor que Direcci&oacute;n de inicio!");
      return false;       
    }
    else{     
        for(var i = 0 ; i < 4 ; i++ )
        {
          if((i<3)&&( Number(endIp[i])!= Number(startIp[i])))
          {
            alertSpecial("IP inicial y final del IP debe estar en la misma subred");
            return false;
          }
        }
        return true;
    }
}

var hexVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
              "A", "B", "C", "D", "E", "F");
var unsafeString = "\"<>%\\^[]`\+\$\,'#&";
// deleted these chars from the include list ";", "/", "?", ":", "@", "=", "&" and #
// so that we could analyze actual URLs

function isUnsafe(compareChar)
// this function checks to see if a char is URL unsafe.
// Returns bool result. True = unsafe, False = safe
{
   if ( unsafeString.indexOf(compareChar) == -1 && compareChar.charCodeAt(0) > 32
        && compareChar.charCodeAt(0) < 123 )
      return false; // found no unsafe chars, return false
   else
      return true;
}

function decToHex(num, radix)
// part of the hex-ifying functionality
{
   var hexString = "";
   while ( num >= radix ) {
      temp = num % radix;
      num = Math.floor(num / radix);
      hexString += hexVals[temp];
   }
   hexString += hexVals[num];
   return reversal(hexString);
}

function reversal(s)
// part of the hex-ifying functionality
{
   var len = s.length;
   var trans = "";
   for (i = 0; i < len; i++)
      trans = trans + s.substring(len-i-1, len-i);
   s = trans;
   return s;
}

function convert(val)
// this converts a given char to url hex form
{
   return  "%" + decToHex(val.charCodeAt(0), 16);
}


function encodeUrl(val)
{
   var len     = val.length;
   var i       = 0;
   var newStr  = "";
   var original = val;

   for ( i = 0; i < len; i++ ) {
      if ( val.substring(i,i+1).charCodeAt(0) < 255 ) {
         // hack to eliminate the rest of unicode from this
         if (isUnsafe(val.substring(i,i+1)) == false)
            newStr = newStr + val.substring(i,i+1);
         else
            newStr = newStr + convert(val.substring(i,i+1));
      } else {
         // woopsie! restore.
         alert ("Found a non-ISO-8859-1 character at position: " + (i+1) + ",\nPlease eliminate before continuing.");
         newStr = original;
         // short-circuit the loop and exit
         i = len;
      }
   }

   return newStr;
}

function alertSpecial(msg) {
    msg = $('<span/>').html(msg).text();
    alert(msg);
}

function confirmSpecial(msg) {
    msg = $('<span/>').html(msg).text();
    return confirm(msg);
}

function htmlEncode(value) {
    return $('<span/>').text(value).html();
}

function htmlDecode(value) {
    return $('<span/>').html(value).text();
}

function addslash(str){
	var count=0;
	var indices = [];		
	for(var i=0; i<str.length;i++) {
		if (str.charAt(i)=='\''||str.charAt(i)=='\\') indices.push(i);
	}
	if (str.indexOf("\'") >= 0)
		count=str.match(/\'/g).length;
	if (str.indexOf("\\") >= 0)
		count+=str.match(/\\/g).length;
	var hostname=str.substring(0, indices[0]);
	for(i=0;i<count;i++){
		hostname+='\\';
		hostname+=str.substring(indices[i],indices[i+1]);
	}
	return hostname;
}

function isXSS(val){
	var pattern = /<[^>]*>/;
	if(pattern.test(val))
		return true;
	else
		return false;
}

function isMacAddr(val)
{
	return /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/i.test(val);
}
