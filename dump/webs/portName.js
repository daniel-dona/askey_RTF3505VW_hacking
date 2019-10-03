// PLEASE NOTE THAT A SPACE BETWEEN TWO WORDS IS TAKEN AS TWO SEPERATE
// WORDS. PLEASE KEEP THIS FILE CONSISTENT.
//
// For each Linux interface name in the boardparms.c file, add
// a corresponding Linux interface name and a user-friendly name
// of its equivalent that must be displayed on the WEB UI. It is
// best if the new inteface names are added at the end.
// Make sure modifications to portName_L are consistent with
//portName_U and viceversa

//Keep #define WL_MAX_NUM_SSID here for Mbss Tag

 portName_L = [
// Wireless interfac Linux interface name
'wl0',
// USB interface Linux interface name
'usb0',
// Board ID 96368VVW Linux name
'96368VVW|eth0',
'96368VVW|eth1',
'96368VVW|eth2',
'96368VVW|eth3',
// Board ID 96362ADVNG Linux name
'96362ADVNG|eth0',
'96362ADVNG|eth1',
'96362ADVNG|eth2',
'96362ADVNG|eth3',
'96362ADVNG|eth4'
];

var portName_U = [
// Wireless interface user-friendly name
'wl0',
// USB user-friendly name
'USB',
// Board ID 96368VVW user-friendly name
'96368VVW|ENET1',
'96368VVW|ENET2',
'96368VVW|ENET3',
'96368VVW|ENET4',
// Board ID 96362ADVNG user-friendly name
'96362ADVNG|ENET1',
'96362ADVNG|ENET2',
'96362ADVNG|ENET3',
'96362ADVNG|ENET4',
'96362ADVNG|ENET5'
];

function getUNameByLName(name) {
   var index = 0;
   var uName   = '';
   var wlName   = '';

   // SafetyNet if someone sends a name without prefixing the
   // board ID and |, then return that name.
   if (name.indexOf('|') == -1)
      return name;
      
   /*Wlan naming: Could be a better name*/
   if (name.indexOf('wl0.') != -1) {
      wlName = name.substring(4);
      return ('wl0_Guest' + wlName);
   }
   else if (name.indexOf('wl0') != -1) {
      return 'wlan0';
   }
   else if (name.indexOf('wl1.') != -1) {
      wlName = name.substring(4);
      return ('wl1_Guest' + wlName);
   }
   else if (name.indexOf('wl1') != -1) {
      return 'wlan1';
   }

   if (name.indexOf('usb0') != -1) {
      return 'USB';
   }
   for (index = 0; index < portName_L.length; index++) {
      if (portName_L[index] == name) {
         uName = portName_U[index].split('|');
         return uName[1];
      }
   }
   uName = name.split('|');
   return uName[1];
}

function getLNameByUName(name) {
   var index = 0;
   var brdIntf = name.split('|');
   var lName   = '';
   var uName   = '';
   var intName   = '';

   // SafetyNet if someone sends a name without prefixing the
   // board ID and |, then return that name.
   if (name.indexOf('|') == -1)
      return name;

   if (name.indexOf('wl0_Guest') != -1) {
      intName = name.substring(9);
      return ('wl0.' + intName);
   }
   if (name.indexOf('wlan0') != -1)
      return 'wl0';

   if (name.indexOf('wl1_Guest') != -1)	{
      intName = name.substring(9);
      return ('wl1.' + intName);
   }
   if (name.indexOf('wlan1') != -1)
      return 'wl1';
      
   if (name.indexOf('USB') != -1)
      return 'usb0';
   for (index = 0; index < portName_U.length; index++) {
      uName = portName_U[index].split('|');
      if (portName_U[index] == name) {
         lName = portName_L[index].split('|');
         return lName[1];
      }
   }
   lName = name.split('|');
   return lName[1];
}
