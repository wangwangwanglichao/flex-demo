/**
 * Created by 520 on 2018/2/5.
 */
function change(obj) {
   obj.iSpeedX = 0;
   obj.iSpeedY = 0;
   var oW = document.documentElement.clientWidth;
   var oH = document.documentElement.clientHeight;

   function startMove(obj) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {
         obj.iSpeedY += 3;
         obj.oLeft = obj.offsetLeft + obj.iSpeedX;
         obj.oTop = obj.offsetTop + obj.iSpeedY;
         if (obj.oLeft >= oW - obj.offsetWidth) {
            obj.oLeft = oW - obj.offsetWidth;
            obj.iSpeedX *= -0.8;
         } else if (obj.oLeft <= 0) {
            obj.oLeft = 0;
            obj.iSpeedX *= -0.8;
         }
         if (obj.oTop >= oH - obj.offsetHeight) {
            obj.oTop = oH - obj.offsetHeight;
            obj.iSpeedY *= -0.8;
            obj.iSpeedX *= 0.8;
         } else if (obj.oTop <= 0) {
            obj.oTop = 0;
            obj.iSpeedY *= -1;
            obj.iSpeedX *= 0.8;
         }
         if (Math.abs(obj.iSpeedX) < 1) {
            obj.iSpeedX = 0;
         }
         if (Math.abs(obj.iSpeedY) < 1) {
            obj.iSpeedY = 0;
         }
         if (obj.iSpeedX == 0 && obj.iSpeedY == 0 && obj.oTop == oH - obj.offsetHeight) {
            clearInterval(obj.timer);
         }
         obj.style.left = obj.oLeft + "px";
         obj.style.top = obj.oTop + "px";
      }, 30);
   }
   obj.lastX = 0;
   obj.lastY = 0;
   obj.onmousedown = function (ev) {
      var oEv = ev || event;
      var disX = oEv.clientX - obj.offsetLeft;
      var disY = oEv.clientY - obj.offsetTop;
      document.onmousemove = function (ev) {
         var oEvent = ev || event;
         obj.oL = oEvent.clientX - disX;
         obj.oT = oEvent.clientY - disY;

         obj.style.left = obj.oL + "px";
         obj.style.top = obj.oT + "px";

         if (obj.offsetLeft >= oW - obj.offsetWidth) {
            obj.style.left = oW - obj.offsetWidth + "px";
         } else if (obj.offsetLeft <= 0) {
            obj.style.left = 0;
         }
         if (obj.offsetTop >= oH - obj.offsetHeight) {
            obj.style.top = oH - obj.offsetHeight + "px";
         } else if (obj.offsetTop <= 0) {
            obj.style.top = 0;
         }

         obj.iSpeedX = obj.oL - obj.lastX;
         obj.iSpeedY = obj.oT - obj.lastY;

         obj.lastX = obj.oL;
         obj.lastY = obj.oT;
      };
      document.onmouseup = function () {
         document.onmousemove = null;
         document.onmouseup = null;
         startMove(obj);
      };
      clearInterval(obj.timer);
      return false;
   };
}
