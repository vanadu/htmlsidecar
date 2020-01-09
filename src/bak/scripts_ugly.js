"use strict";var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"])_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();var Dimwhit=function(){window.onload=function(){initApp()};function appObj(filename,appContainerW,appContainerH,viewportW,viewportH,initViewerW,initViewerH,viewerW,viewerH,imgW,imgH,imgNW,imgNH,sPhoneW,sPhoneH,lPhoneW,lPhoneH){return{filename:filename,appContainerW:appContainerW,appContainerH:appContainerH,viewportW:viewportW,viewportH:viewportH,initViewerW:initViewerW,initViewerH:initViewerH,viewerW:viewerW,viewerH:viewerH,imgW:imgW,imgH:imgH,imgNW:imgNW,imgNH:imgNH,sPhoneW:sPhoneW,sPhoneH:sPhoneH,lPhoneW:lPhoneW,lPhoneH:lPhoneH}}function dimViewers(filename,display,diskimg,aspect,smallphones,largephones,retina,clipboardBut){return{filename:filename,display:display,diskimg:diskimg,aspect:aspect,smallphones:smallphones,largephones:largephones,retina:retina,clipboardBut:clipboardBut}}function toolButtons(viewerWidth,grow50,grow10,grow01,customWidth,toggleImgSize,customHeight,shrink01,shrink10,shrink50,sPhoneWidth,lPhoneWidth){return{viewerWidth:viewerWidth,grow50:grow50,grow10:grow10,grow01:grow01,customWidth:customWidth,toggleImgSize:toggleImgSize,customHeight:customHeight,shrink01:shrink01,shrink10:shrink10,shrink50:shrink50,sPhoneWidth:sPhoneWidth,lPhoneWidth:lPhoneWidth}}function appRegions(dropArea,curImg,imgViewer,imgViewport,toolsContainer,ccpContainer,appContainer){return{dropArea:dropArea,curImg:curImg,imgViewer:imgViewer,imgViewport:imgViewport,toolsContainer:toolsContainer,ccpContainer:ccpContainer,appContainer:appContainer}}function ccpUserInput(imgClass,imgAlt,imgAlign,imgRelPath,tdClass,tdAlign,tdValign,tableClass,tableAlign,tableWidth,tableMaxWidth){return{imgClass:imgClass,imgAlt:imgAlt,imgAlign:imgAlign,imgRelPath:imgRelPath,tdClass:tdClass,tdAlign:tdAlign,tdValign:tdValign,tableClass:tableClass,tableAlign:tableAlign,tableWidth:tableWidth,tableMaxWidth:tableMaxWidth}}function ccpPropStrings(imgClass,imgAlt,imgAlign,imgRelPath,imgWidth,imgMaxWidth,tdClass,tdAlign,tdValign,tableClass,tableAlign,tableWidth){return{imgClass:imgClass,imgAlt:imgAlt,imgAlign:imgAlign,imgRelPath:imgRelPath,imgWidth:imgWidth,imgMaxWidth:imgMaxWidth,tdClass:tdClass,tdAlign:tdAlign,tdValign:tdValign,tableClass:tableClass,tableAlign:tableAlign,tableWidth:tableWidth}}function ccpBuildTag(imgBuildHTMLBut,imgBuildCSSBut,smallPhonesBuildCSSBut,largePhonesBuildCSSBut){return{imgBuildHTMLBut:imgBuildHTMLBut,imgBuildCSSBut:imgBuildCSSBut,smallPhonesBuildCSSBut:smallPhonesBuildCSSBut,largePhonesBuildCSSBut:largePhonesBuildCSSBut}}function initApp(){dimViewers.filename=document.getElementById("filename-viewer");dimViewers.display=document.getElementById("dim-viewer-display");dimViewers.diskimg=document.getElementById("dim-viewer-disk-img");dimViewers.aspect=document.getElementById("dim-viewer-aspect");dimViewers.smallphones=document.getElementById("dim-viewer-small-phones");dimViewers.largephones=document.getElementById("dim-viewer-large-phones");dimViewers.retina=document.getElementById("dim-viewer-retina");dimViewers.clipboardBut=document.getElementById("clipboard-but");toolButtons.viewerWidth=document.getElementById("main-image-viewer-wdth");toolButtons.grow50=document.getElementById("main-image-grow-50");toolButtons.grow10=document.getElementById("main-image-grow-10");toolButtons.grow01=document.getElementById("main-image-grow-01");toolButtons.customWidth=document.getElementById("main-img-custom-wdth");toolButtons.toggleImgSize=document.getElementById("toggle-image-size");toolButtons.customHeight=document.getElementById("main-img-custom-hght");toolButtons.shrink01=document.getElementById("main-image-shrink-01");toolButtons.shrink10=document.getElementById("main-image-shrink-10");toolButtons.shrink50=document.getElementById("main-image-shrink-50");toolButtons.sPhoneWidth=document.getElementById("small-phones-wdth");toolButtons.lPhoneWidth=document.getElementById("large-phones-wdth");ccpUserInput.imgClass=document.getElementById("img-class-input");ccpUserInput.imgAlt=document.getElementById("img-alt-input");ccpUserInput.imgAlign=document.getElementById("img-align-select");ccpUserInput.imgRelPath=document.getElementById("img-relpath-input");ccpUserInput.imgWidth=document.getElementById("img-width-select");ccpUserInput.imgMaxWidth=document.getElementById("img-max-width-input");ccpUserInput.tdClass=document.getElementById("td-class-input");ccpUserInput.tdAlign=document.getElementById("td-align-select");ccpUserInput.tdValign=document.getElementById("td-valign-select");ccpUserInput.tableClass=document.getElementById("table-class-input");ccpUserInput.tableAlign=document.getElementById("table-align-select");ccpUserInput.tableWidth=document.getElementById("table-width-select");ccpUserInput.tableMaxWidth=document.getElementById("table-max-width-input");ccpBuildTag.imgBuildHTMLBut=document.getElementById("img-build-html-but");ccpBuildTag.imgBuildCSSBut=document.getElementById("img-build-css-but");ccpBuildTag.smallPhonesBuildCSSBut=document.getElementById("sphones-build-css-but");ccpBuildTag.largePhonesBuildCSSBut=document.getElementById("lphones-build-css-but");ccpBuildTag.tdBuildHTMLBut=document.getElementById("td-build-html-but");ccpBuildTag.tableBuildHTMLBut=document.getElementById("table-build-html-but");appRegions.dropArea=document.getElementById("drop-area");appRegions.imgViewer=document.getElementById("main-image-viewer");appRegions.imgViewport=document.getElementById("image-viewport");appRegions.toolsContainer=document.getElementById("tools-container");appRegions.ccpContainer=document.getElementById("ccp");appRegions.appContainer=document.getElementById("app-container");appRegions.dropArea.style.display="block";dimViewers.clipboardBut.style.display="none";appObj.imgW=600;appObj.imgH=400;appObj.viewerW=appObj.initViewerW=650;appObj.viewerH=appObj.initViewerH=500;var _adjustHeights=adjustHeights(appObj.imgH);var _adjustHeights2=_slicedToArray(_adjustHeights,3);appObj.viewerH=_adjustHeights2[0];appObj.viewportH=_adjustHeights2[1];appObj.appContainerH=_adjustHeights2[2];appObj.sPhoneW=320;appObj.lPhoneW=480;appObj.viewportW=appRegions.imgViewport.offsetWidth-48;appRegions.imgViewer.style.width=intToPx(appObj.initViewerW);appRegions.imgViewer.style.height=intToPx(appObj.initViewerH);appRegions.imgViewport.style.height=intToPx(appObj.viewportH);appRegions.appContainer.style.height=intToPx(appObj.appContainerH);if(document.getElementById("main-img")){appRegions.curImg=document.getElementById("main-img");getCurImg()}else{}refreshDimViewers(appObj,dimViewers)}function getCurImg(curImg,fileName){if(appRegions.ccpContainer.classList.contains("active")){appRegions.ccpContainer.classList.remove("active")}if(getComputedStyle(appRegions.toolsContainer,null).display=="none"){appRegions.toolsContainer.style.display="block"}var devIMG="";if(curImg){devIMG=false}else{appRegions.dropArea.style.display="none";dimViewers.clipboardBut.style.display="block";var imgPath=appRegions.curImg.src;var pathArray=imgPath.split("/");fileName=pathArray[pathArray.length-1];devIMG=true}appRegions.dropArea.style.display="none";dimViewers.clipboardBut.style.display="block";var curImgDiv=document.createElement("div");curImgDiv.id="main-img-container";document.getElementById("main-image").insertBefore(curImgDiv,null);document.getElementById("main-img-container").insertBefore(appRegions.curImg,null);if(devIMG===true){initAppObj(appRegions.curImg,fileName);return}else{appRegions.curImg.onload=function(){initAppObj(curImg,fileName)}}}function initAppObj(curImg,fileName){appObj.imgNW=curImg.naturalWidth;appObj.imgNH=curImg.naturalHeight;appObj.filename=fileName;var maxViewerWidth=parseInt(window.getComputedStyle(appRegions.appContainer,null).getPropertyValue("width"),10)-48;switch(true){case appObj.imgNW<=appObj.viewerW&&appObj.imgNH<appObj.viewerH:appObj.imgW=appObj.imgNW;appObj.imgH=appObj.imgNH;var _adjustHeights3=adjustHeights(appObj.imgH);var _adjustHeights4=_slicedToArray(_adjustHeights3,3);appObj.viewerH=_adjustHeights4[0];appObj.viewportH=_adjustHeights4[1];appObj.appContainerH=_adjustHeights4[2];break;case appObj.imgNW>appObj.viewerW&&appObj.imgNH<appObj.viewerH:appObj.imgW=appObj.viewerW;appObj.imgH=Math.round(1/getAspectRatio(appObj.imgNW,appObj.imgNH)[0]*appObj.imgW);appObj.viewerH=appObj.imgH;var _adjustHeights5=adjustHeights(appObj.imgH);var _adjustHeights6=_slicedToArray(_adjustHeights5,3);appObj.viewerH=_adjustHeights6[0];appObj.viewportH=_adjustHeights6[1];appObj.appContainerH=_adjustHeights6[2];break;case appObj.imgNW<=appObj.viewerW&&appObj.imgNH>appObj.viewerH:appObj.viewerH=appObj.imgH=appObj.imgNH;appObj.imgW=appObj.imgNW;var _adjustHeights7=adjustHeights(appObj.imgH);var _adjustHeights8=_slicedToArray(_adjustHeights7,3);appObj.viewerH=_adjustHeights8[0];appObj.viewportH=_adjustHeights8[1];appObj.appContainerH=_adjustHeights8[2];break;case appObj.imgNW>appObj.viewerW&&appObj.imgNH>appObj.viewerH:appObj.imgW=appObj.viewerW;appObj.imgH=Math.round(1/getAspectRatio(appObj.imgNW,appObj.imgNH)[0]*appObj.imgW);appObj.viewerH=appObj.imgH;var _adjustHeights9=adjustHeights(appObj.imgH);var _adjustHeights10=_slicedToArray(_adjustHeights9,3);appObj.viewerH=_adjustHeights10[0];appObj.viewportH=_adjustHeights10[1];appObj.appContainerH=_adjustHeights10[2];break}toolButtons.viewerWidth.placeholder=appObj.viewerW;appRegions.curImg.style.width=intToPx(appObj.imgW);appRegions.curImg.style.height=intToPx(appObj.imgH);appRegions.imgViewer.style.height=intToPx(appObj.viewerH);appRegions.imgViewport.style.height=intToPx(appObj.viewportH);appRegions.appContainer.style.height=intToPx(appObj.appContainerH);refreshDimViewers(appObj,dimViewers)}function refreshAppObj(e){var keyPressed=void 0;var isErr=void 0;var resetVal=void 0;var increm=void 0;var sign=void 0;var inputVal=void 0;var aspect=getAspectRatio(appObj.imgNW,appObj.imgNH)[0];switch(true){case this.id.includes("grow")||this.id.includes("shrink"):sign=this.id.includes("grow");increm=this.id.slice(-2);increm=Number(increm);if(sign===false){increm=-increm}resetVal=appObj.imgW;inputVal=parseInt(appObj.imgW)+increm;if(errorHandler(this.id,inputVal)){return}appObj.imgW=inputVal;appObj.imgH=Math.round(1/aspect*appObj.imgW);break;case this.id.includes("custom-wdth")||this.id.includes("custom-hght")||this.id.includes("viewer-wdth")||this.id.includes("phones-wdth"):keyPressed=e.which||e.keyCode||e.key;console.log("keyPressed is: "+keyPressed);if(keyPressed===13){inputVal=this.value;switch(true){case this.id==="main-image-viewer-wdth":isErr=validateInteger(inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}isErr=errorHandler(this.id,inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}appObj.viewerW=inputVal;var _adjustHeights11=adjustHeights(appObj.imgH);var _adjustHeights12=_slicedToArray(_adjustHeights11,3);appObj.viewerH=_adjustHeights12[0];appObj.viewportH=_adjustHeights12[1];appObj.appContainerH=_adjustHeights12[2];break;case this.id==="main-img-custom-wdth":console.log("Case 2: appObj.imgW is: "+appObj.imgW);isErr=validateInteger(inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}isErr=errorHandler(this.id,inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}appObj.imgW=inputVal;appObj.imgH=Math.round(1/aspect*appObj.imgW);if(appObj.imgH>appObj.viewerH){var _adjustHeights13=adjustHeights(appObj.imgH);var _adjustHeights14=_slicedToArray(_adjustHeights13,3);appObj.viewerH=_adjustHeights14[0];appObj.viewportH=_adjustHeights14[1];appObj.appContainerH=_adjustHeights14[2];appObj.viewerH=appObj.imgH}break;case this.id==="main-img-custom-hght":isErr=validateInteger(inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}var checkWidth=Math.round(aspect*inputVal);isErr=errorHandler(this.id,checkWidth);if(isErr){this.id.value="";resetPlaceholders(this.id);return}appObj.imgH=inputVal;appObj.imgW=Math.round(aspect*appObj.imgH);break;case this.id.includes("small-phones-wdth"):isErr=validateInteger(inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}isErr=errorHandler(this.id,inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}appObj.sPhoneW=inputVal;toolButtons.sPhoneWidth.value=appObj.sPhoneW;break;case this.id.includes("large-phones-wdth"):isErr=validateInteger(inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}isErr=errorHandler(this.id,inputVal);if(isErr){this.id.value="";resetPlaceholders(this.id);return}appObj.lPhoneW=inputVal}break}}appRegions.curImg.style.width=intToPx(appObj.imgW);appRegions.curImg.style.height=intToPx(appObj.imgH);appRegions.imgViewer.style.width=intToPx(appObj.viewerW);appRegions.imgViewer.style.height=intToPx(appObj.viewerH);appRegions.imgViewport.style.height=intToPx(appObj.viewportH);appRegions.appContainer.style.height=intToPx(appObj.appContainerH);refreshDimViewers(appObj,dimViewers)}function showDimensionAlerts(){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=Object.keys(dimViewers)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var key=_step.value;var val=dimViewers[key];val.style.color="rgba(255, 255, 255, 0.5)"}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}if(appObj.imgW>appObj.imgNW||appObj.imgH>appObj.imgNH){dimViewers.display.style.color="red"}if(2*appObj.sPhoneW>appObj.imgNW){dimViewers.smallphones.style.color="red";dimViewers.largephones.style.color="red"}if(2*appObj.lPhoneW>appObj.imgNW){dimViewers.largephones.style.color="red"}if(appObj.imgNW<2*appObj.imgW){dimViewers.diskimg.style.color="red"}}function refreshDimViewers(appObj,dimViewers){if(!appObj.filename){dimViewers.filename.innerHTML="";dimViewers.display.innerHTML=dimViewers.diskimg.innerHTML=dimViewers.aspect.innerHTML=dimViewers.smallphones.innerHTML=dimViewers.largephones.innerHTML=dimViewers.retina.innerHTML="<span class='pop-font'>&nbsp;&nbsp;No Image</span>";return}else{dimViewers.filename.innerHTML=appObj.filename;dimViewers.display.innerHTML="<span class='pop-font'><span id=\"display-size-width\">"+appObj.imgW+'</span> X <span id="display-size-height">'+appObj.imgH+"</span></span>";dimViewers.diskimg.innerHTML="<span class='pop-font'>"+appObj.imgNW+" X "+appObj.imgNH+"</span>";dimViewers.aspect.innerHTML="<span class='pop-font'>"+getAspectRatio(appObj.imgNW,appObj.imgNH)[1]+"</span>";appObj.sPhoneH=Math.round(appObj.sPhoneW*(1/getAspectRatio(appObj.imgNW,appObj.imgNH)[0]));dimViewers.smallphones.innerHTML="<span class='pop-font'><span id='small-phones-width'>"+appObj.sPhoneW+"</span> X <span id='small-phones-height'>"+appObj.sPhoneH+"</span></span>";appObj.lPhoneH=Math.round(appObj.lPhoneW*(1/getAspectRatio(appObj.imgNW,appObj.imgNH)[0]));dimViewers.largephones.innerHTML="<span class='pop-font'><span id='large-phones-width'>"+appObj.lPhoneW+"</span> X <span id='large-phones-height'>"+appObj.lPhoneH+"</span></span>";dimViewers.retina.innerHTML="<span class='pop-font'>"+2*appObj.imgW+"</span> X <span class='pop-font'>"+2*appObj.imgH;showDimensionAlerts();return appObj,dimViewers}}function adjustHeights(heightVal){var viewerH=void 0;var viewportH=void 0;var appContainerH=void 0;if(heightVal<=appObj.initViewerH){viewerH=appObj.initViewerH;viewportH=viewerH+145}else{viewerH=heightVal;viewportH=heightVal+145}appContainerH=viewportH;return[viewerH,viewportH,appContainerH]}function toggleCCP(){appRegions.ccpContainer.classList.toggle("active");var tableMaxWidth="'<option>"+appObj.viewerW+"</option><option>100%</option>'";document.getElementById("table-width-select").innerHTML=tableMaxWidth;document.getElementById("table-max-width").style.display="none";var imgMaxWidth="'<option>"+appObj.imgW+"</option><option>100%</option>'";document.getElementById("img-width-select").innerHTML=imgMaxWidth;document.getElementById("img-max-width").style.display="none"}function handleOnChange(e){var index=e.target.selectedIndex;var plchldr=void 0;var el=void 0;var inputel=void 0;switch(true){case e.target.id==="img-width-select":el=document.getElementById("img-max-width");inputel=document.getElementById("img-max-width-input");plchldr=""+appObj.imgW;break;case e.target.id==="table-width-select":el=document.getElementById("table-max-width");inputel=document.getElementById("table-max-width-input");plchldr=""+appObj.viewerW;break}if(index===0){el.style.display="none"}else{el.disabled=true;inputel.placeholder=plchldr;inputel.disabled=true;el.style.display="block"}}function ccpGetUserInput(){if(ccpUserInput.imgClass.value){ccpPropStrings.imgClass=' class="'+ccpUserInput.imgClass.value+'"'}else{ccpPropStrings.imgClass=""}if(ccpUserInput.imgAlt.value){ccpPropStrings.imgAlt=' alt="'+ccpUserInput.imgAlt.value+'"'}else{ccpPropStrings.imgAlt=""}if(ccpUserInput.imgAlign.selectedIndex===0){ccpPropStrings.imgAlign=""}else{ccpPropStrings.imgAlign=' align="'+ccpUserInput.imgAlign.value+'"'}if(ccpUserInput.imgRelPath.value){ccpPropStrings.imgRelPath=ccpUserInput.imgRelPath.value}else{ccpPropStrings.imgRelPath=""}if(ccpUserInput.imgWidth.selectedIndex===0){ccpPropStrings.imgWidth=' width="'+appObj.imgW+'"';ccpPropStrings.imgMaxWidth=""}else{ccpPropStrings.imgWidth=' width="100%"';ccpPropStrings.imgMaxWidth=" max-width: "+appObj.imgW+"px; "}if(ccpUserInput.tdClass.value){ccpPropStrings.tdClass=' class="'+ccpUserInput.tdClass.value+'"'}else{ccpPropStrings.tdClass=""}if(ccpUserInput.tdAlign.selectedIndex==0){ccpPropStrings.tdAlign=""}else{ccpPropStrings.tdAlign=' align="'+ccpUserInput.tdAlign.value+'"'}if(ccpUserInput.tdValign.selectedIndex==0){ccpPropStrings.tdValign=""}else{ccpPropStrings.tdValign=' align="'+ccpUserInput.tdValign.value+'"'}if(ccpUserInput.tableClass){ccpPropStrings.tableClass=' class="'+ccpUserInput.tableClass.value+'"'}else{ccpPropStrings.tableClass=""}ccpPropStrings.tableAlign=' align="'+ccpUserInput.tableAlign.value+'"';if(ccpUserInput.tableWidth.selectedIndex===0){ccpPropStrings.tableWidth=' width="'+appObj.viewerW+'"'}else{ccpPropStrings.tableWidth=' width="100%" style="max-width: '+appObj.viewerW+'px"'}return ccpUserInput,ccpPropStrings}function showMobileImageButtons(e){var target=this.id;var inputVal=this.value;if(ccpUserInput.imgClass.value){ccpBuildTag.imgBuildCSSBut.classList.add("active");ccpBuildTag.smallPhonesBuildCSSBut.classList.add("active");ccpBuildTag.largePhonesBuildCSSBut.classList.add("active")}else{ccpBuildTag.imgBuildCSSBut.classList.remove("active");ccpBuildTag.smallPhonesBuildCSSBut.classList.remove("active");ccpBuildTag.largePhonesBuildCSSBut.classList.remove("active")}var obj=ccpGetUserInput()}new Clipboard("#img-build-html-but",{text:function text(trigger){var obj=ccpGetUserInput();if(ccpUserInput.imgClass.value){if(errorHandler("className",ccpUserInput.imgClass.value)){return}}if(ccpUserInput.imgRelPath.value){if(errorHandler("imgRelPath",ccpUserInput.imgRelPath.value)){return}}var fullWidthSelected;var widthHTMLAttribute;var widthCSSProperty;if(ccpUserInput.imgWidth.selectedIndex===1){fullWidthSelected=true;widthHTMLAttribute="100%";widthCSSProperty="max-width: "+appObj.imgW}else{fullWidthSelected=false;widthHTMLAttribute=appObj.imgW;widthCSSProperty="width: "+appObj.imgW}console.log("fullWidthSelected is: "+fullWidthSelected);var imgClipboardOutput="<img"+ccpPropStrings.imgClass+ccpPropStrings.imgAlign+ccpPropStrings.imgAlt+' width="'+widthHTMLAttribute+'" height="'+appObj.imgH+'" src="'+ccpPropStrings.imgRelPath+"/"+appObj.filename+'" border="0" style="'+widthCSSProperty+"px; height: "+appObj.imgH+'px; margin: 0px; border: none; outline: none; text-decoration: none; display: block; ">';var mess=convBracketsToEntities(imgClipboardOutput);mess="&lt;img&gt; copied to Clipboard!";showMessage(mess,false);console.log("Clipboard: "+imgClipboardOutput);return imgClipboardOutput}});new Clipboard("#td-build-html-but",{text:function text(trigger){var obj=ccpGetUserInput();if(ccpUserInput.imgClass.value||ccpUserInput.tdClass.value){if(errorHandler("className",ccpUserInput.imgClass.value)){return}if(ccpUserInput.imgRelPath.value){if(errorHandler("imgRelPath",ccpUserInput.imgRelPath.value)){return}}if(errorHandler("className",ccpUserInput.tdClass.value)){return}}var imgClipboardOutput="<td"+ccpPropStrings.tdClass+ccpPropStrings.tdAlign+ccpPropStrings.tdValign+">\n  <img"+ccpPropStrings.imgClass+ccpPropStrings.imgAlign+ccpPropStrings.imgAlt+' width="'+appObj.imgW+'" height="'+appObj.imgH+'" src="'+ccpPropStrings.imgRelPath+"/"+appObj.filename+'" border="0" style="margin: 0px; border: none; outline: none; text-decoration: none; width: '+appObj.imgW+"px; height: "+appObj.imgH+'px; display: block; ">\n</td>';var mess=convBracketsToEntities(imgClipboardOutput);mess="&lt;td&gt; copied to Clipboard!";showMessage(mess,false);console.log("Clipboard: "+imgClipboardOutput);return imgClipboardOutput}});new Clipboard("#table-build-html-but",{text:function text(trigger){var obj=ccpGetUserInput();if(ccpUserInput.imgClass.value||ccpUserInput.tdClass.value||ccpUserInput.tableClass.value){if(errorHandler("className",ccpUserInput.imgClass.value)){return}if(ccpUserInput.imgRelPath){if(errorHandler("imgRelPath",ccpUserInput.imgRelPath.value)){return}}if(errorHandler("className",ccpUserInput.tdClass.value)){return}if(errorHandler("className",ccpUserInput.tableClass.value)){return}}var imgClipboardOutput='<table border="0" cellpadding="0" cellspacing="0"'+ccpPropStrings.tableClass+ccpPropStrings.tableAlign+ccpPropStrings.tableWidth+">\n  <tbody>\n  <tr>\n    <td"+ccpPropStrings.tdClass+ccpPropStrings.tdAlign+ccpPropStrings.tdValign+">\n      <img"+ccpPropStrings.imgClass+ccpPropStrings.imgAlign+ccpPropStrings.imgAlt+' width="'+appObj.imgW+'" height="'+appObj.imgH+'" src="'+ccpPropStrings.imgRelPath+"/"+appObj.filename+'" border="0" style="margin: 0px; border: none; outline: none; text-decoration: none; width: '+appObj.imgW+"px; height: "+appObj.imgH+'px; display: block; ">\n    </td>\n  </tr>\n  </tbody>\n</table>';console.log("Clipboard: "+imgClipboardOutput);var mess=convBracketsToEntities(imgClipboardOutput);mess="&lt;table&gt; copied to Clipboard!";showMessage(mess,false);return imgClipboardOutput}});new Clipboard("#img-build-css-but",{text:function text(trigger){var obj=ccpGetUserInput();if(ccpUserInput.imgClass.value){if(errorHandler("className",ccpUserInput.imgClass.value)){return}}var imgClipboardOutput="img."+ccpUserInput.imgClass.value+" { width: "+appObj.imgW+"px !important; height: "+appObj.imgH+"px !important; }";console.log("Clipboard: "+imgClipboardOutput);var mess=convBracketsToEntities(imgClipboardOutput);mess="Image CSS copied to Clipboard!";showMessage(mess,false);return imgClipboardOutput}});new Clipboard("#sphones-build-css-but",{text:function text(trigger){var obj=ccpGetUserInput();if(ccpUserInput.imgClass.value){if(errorHandler("className",ccpUserInput.imgClass.value)){return}}var imgClipboardOutput="img."+ccpUserInput.imgClass.value+" { width: "+appObj.sPhoneW+"px !important; height: "+appObj.sPhoneH+"px !important; }";console.log("Clipboard: "+imgClipboardOutput);var mess=convBracketsToEntities(imgClipboardOutput);mess="Small phone CSS copied to Clipboard!";showMessage(mess,false);return imgClipboardOutput}});new Clipboard("#lphones-build-css",{text:function text(trigger){var obj=ccpGetUserInput();if(ccpUserInput.imgClass.value){if(errorHandler("className",ccpUserInput.imgClass.value)){return}}var imgClipboardOutput="img."+ccpUserInput.imgClass.value+" { width: "+appObj.lPhoneW+"px !important; height: "+appObj.lPhoneH+"px !important; }";console.log("Clipboard: "+imgClipboardOutput);var mess=convBracketsToEntities(imgClipboardOutput);mess="Large phone CSS copied to Clipboard!";showMessage(mess,false);return imgClipboardOutput}});function getAspectRatio(var1,var2){var aspectReal=var1/var2;var aspectInt=function(){function gcd(var1,var2){if(var2>var1){var temp=var1;var1=var2;var2=temp}while(var2!=0){var m=var1%var2;var1=var2;var2=m}return var1}var gcdVal=gcd(var1,var2);var w=var1/gcdVal;var h=var2/gcdVal;aspectInt=w+" : "+h;return aspectInt}();return[aspectReal,aspectInt]}function intToPx(int){var pxval=void 0;var str=String(int);pxval=str+"px";return pxval}function handleFileSelect(evt){if(appObj.filename){appRegions.curImg.parentNode.removeChild(appRegions.curImg)}evt.stopPropagation();evt.preventDefault();var files=evt.dataTransfer.files;var f=files[0];if(!f.type.match("image.*")){console.log("NOT IMAGE");var target="notimage";console.log("!VA Not an image file error: Exiting...");return}var reader=new FileReader;reader.onload=function(theFile){return function(e){var curImg=new Image;curImg.id="main-img";curImg.src=e.target.result;var fileName=void 0;fileName=theFile.name;appRegions.curImg=curImg;getCurImg(curImg,fileName)}}(f);reader.readAsDataURL(f)}function handleDragOver(evt){evt.stopPropagation();evt.preventDefault();evt.dataTransfer.dropEffect="copy"}var dropZone=document.getElementById("app-container");dropZone.addEventListener("dragover",handleDragOver,false);dropZone.addEventListener("drop",handleFileSelect,false);function addEventHandler(oNode,evt,oFunc,bCaptures){oNode.addEventListener(evt,oFunc,bCaptures)}function initializeHandlers(){addEventHandler(dimViewers.clipboardBut,"click",toggleCCP,false);addEventHandler(dimViewers.clipboardBut,"keypress",toggleCCP,false);addEventHandler(ccpUserInput.imgClass,"keypress",showMobileImageButtons,false);addEventHandler(ccpUserInput.imgClass,"blur",showMobileImageButtons,false);addEventHandler(toolButtons.grow01,"click",refreshAppObj,false);addEventHandler(toolButtons.shrink01,"click",refreshAppObj,false);addEventHandler(toolButtons.grow10,"click",refreshAppObj,false);addEventHandler(toolButtons.shrink10,"click",refreshAppObj,false);addEventHandler(toolButtons.grow50,"click",refreshAppObj,false);addEventHandler(toolButtons.shrink50,"click",refreshAppObj,false);addEventHandler(toolButtons.customWidth,"dragover",killDrop,false);addEventHandler(toolButtons.customWidth,"drop",killDrop,false);addEventHandler(toolButtons.customHeight,"dragover",killDrop,false);addEventHandler(toolButtons.customHeight,"drop",killDrop,false);addEventHandler(toolButtons.viewerWidth,"dragover",killDrop,false);addEventHandler(toolButtons.viewerWidth,"drop",killDrop,false);addEventHandler(toolButtons.viewerWidth,"keypress",refreshAppObj,false);addEventHandler(toolButtons.viewerWidth,"click",focusOnClick,false);addEventHandler(toolButtons.customWidth,"click",focusOnClick,false);addEventHandler(toolButtons.customWidth,"keypress",refreshAppObj,false);addEventHandler(toolButtons.customHeight,"click",focusOnClick,false);addEventHandler(toolButtons.customHeight,"keypress",refreshAppObj,false);addEventHandler(toolButtons.viewerWidth,"blur",handleInputBlur,false);addEventHandler(toolButtons.customWidth,"blur",handleInputBlur,false);addEventHandler(toolButtons.customHeight,"blur",handleInputBlur,false);addEventHandler(toolButtons.sPhoneWidth,"dragover",killDrop,false);addEventHandler(toolButtons.sPhoneWidth,"drop",killDrop,false);addEventHandler(toolButtons.sPhoneWidth,"keypress",refreshAppObj,false);addEventHandler(toolButtons.sPhoneWidth,"blur",handleInputBlur,false);addEventHandler(toolButtons.sPhoneWidth,"click",focusOnClick,false);addEventHandler(toolButtons.lPhoneWidth,"dragover",killDrop,false);addEventHandler(toolButtons.lPhoneWidth,"drop",killDrop,false);addEventHandler(toolButtons.lPhoneWidth,"keypress",refreshAppObj,false);addEventHandler(toolButtons.lPhoneWidth,"blur",handleInputBlur,false);addEventHandler(toolButtons.lPhoneWidth,"click",focusOnClick,false);addEventHandler(ccpUserInput.tableWidth,"change",handleOnChange,false);addEventHandler(ccpUserInput.imgWidth,"change",handleOnChange,false)}addEventHandler(window,"load",function(evt){initializeHandlers()});function killDrop(e){e=e||event;e.preventDefault()}function handleInputBlur(e){console.log(e);var target=this.id;switch(true){case target==="main-image-viewer-wdth":resetPlaceholders(target);break;case target==="small-phones-wdth":break;case target==="large-phones-wdth":break;case target==="main-img-custom-wdth":resetPlaceholders(target);break;case target==="main-img-custom-hght":resetPlaceholders(target);break}}function resetPlaceholders(target){switch(true){case target==="main-image-viewer-wdth":console.log("target is: "+target);toolButtons.viewerWidth.value="";toolButtons.viewerWidth.placeholder=appObj.viewerW;break;case target==="main-img-custom-wdth":document.getElementById(target).value="";document.getElementById(target).placeholder="W (px)";break;case target==="main-img-custom-hght":document.getElementById(target).value="";document.getElementById(target).placeholder="H (px)";break;case target==="small-phones-wdth":console.log("resetPlaceholders...");document.getElementById(target).value="";document.getElementById(target).placeholder=appObj.sPhoneW;break;case target==="large-phones-wdth":document.getElementById(target).value="";document.getElementById(target).placeholder=appObj.lPhoneW;break}}function handleAfterBlur(target){console.log("!VA - Leaving input field...")}function validateInteger(inputVal){var isErr=void 0;var mess=void 0;console.log("in errorHandler...validating integer");if(!parseInt(inputVal,10)||inputVal%1!==0||inputVal<0){console.log("not an integer....");isErr=true;mess=errorMessages("notinteger");showMessage(mess,isErr)}else{inputVal=parseInt(inputVal);isErr=false}return isErr}function errorHandler(target,inputVal){var isErr=false;var mess=void 0;switch(true){case target.includes("viewer-wdth"):if(inputVal>=appObj.viewportW){console.log("errorHandler appObj.viewportW is: "+appObj.viewportW);console.log("viewerwexceedsviewportw");mess=errorMessages("viewerwexceedsviewportw");console.log("mess is: "+mess);isErr=true}else if(inputVal<appObj.imgW){console.log("viewerwdeceedsimgw");mess=errorMessages("viewerwdeceedsimgw");isErr=true}resetPlaceholders();break;case target.includes("custom-wdth")||target.includes("custom-hght"):if(inputVal>appObj.viewerW){console.log("imgexceedsviewerwidth");mess=errorMessages("imgexceedsviewerwidth");isErr=true}resetPlaceholders();break;case target.includes("grow")||target.includes("shrink"):if(inputVal>appObj.viewerW){console.log("inputVal: "+inputVal);console.log("appObj.viewerW is: "+appObj.viewerW);console.log("growimgfail");mess=errorMessages("growimgfail");isErr=true}else if(inputVal<1){console.log("inputVal: "+inputVal);console.log("appObj.viewerW is: "+appObj.viewerW);console.log("shrinkimgfail");mess=errorMessages("shrinkimgfail");isErr=true}break;case target==="className":if(!inputVal){isErr=false}else if(!/^[a-z_-][a-z\d_-]*$/i.test(inputVal)){var err="invalidclassname";ccpUserInput.imgClass="";mess=errorMessages(err);isErr=true}break;case target==="imgRelPath":if(!inputVal){isErr=false}else if(!/^[^\\/?%*:|"<>.]+$/i.test(inputVal)){console.log("errorHandler...not a valid folder name ")}break;case target==="small-phones-wdth":if(inputVal>320||inputVal<260){mess=errorMessages("badsmallphoneinput");isErr=true;resetPlaceholders(target,inputVal)}break;case target==="large-phones-wdth":if(inputVal>480||inputVal<400){mess=errorMessages("badlargephoneinput");isErr=true;resetPlaceholders(target,appObj.lPhoneW)}break}if(isErr){showMessage(mess,true)}return isErr}function errorMessages(err){var mess="undefined error";switch(true){case err==="viewerwexceedsviewportw":mess="Container width can't exceed the width of the viewport.";break;case err==="viewerwdeceedsimgw":mess="Container width can't be smaller than the current image width. <br /> First resize the image, then the viewer.";break;case err==="notinteger":mess="Image width and height must be entered as positive whole number.";break;case err==="growimgfail":mess="Image can't be wider than its container.";break;case err==="shrinkimgfail":mess="Image width can't be less than 0.";break;case err==="imgexceedsviewerwidth":mess="Image width can't be greater than the container width.";break;case err==="invalidclassname":mess="Invalid class name &mdash; please check your entries.";break;case err==="badsmallphoneinput":mess="Small phone device width must be between 260 and 320.";break;case err==="badlargephoneinput":mess="Large phone device width must be between 400 and 480.";break}return mess}function convBracketsToEntities(str){str=str.replace(/</g,"&lt;");str=str.replace(/>/g,"&gt;");return str}function showMessage(mess,isErr){var displayTime=void 0;var errViewerContainer=document.getElementById("dim-error-container");var errMessContainer=document.getElementById("dim-error-message");var dimViewers=document.getElementById("dim-viewers");errMessContainer.innerHTML=mess;errViewerContainer.classList.add("show-err");dimViewers.classList.add("show-err");appRegions.toolsContainer.classList.add("show-err");if(isErr){document.querySelector("#dim-error-container table td").style.color="#ff9a9a";displayTime=3e3}else{document.querySelector("#dim-error-container table td").style.color="#FFF";displayTime=1e3}setTimeout(function(){errViewerContainer.classList.add("hide-err");dimViewers.classList.add("hide-err");appRegions.toolsContainer.classList.add("hide-err");errViewerContainer.classList.remove("show-err");dimViewers.classList.remove("show-err");appRegions.toolsContainer.classList.remove("show-err");setTimeout(function(){errViewerContainer.classList.remove("hide-err");dimViewers.classList.remove("hide-err");appRegions.toolsContainer.classList.remove("hide-err")},250)},displayTime)}function getFocus(e){var focused;if(!e)var e=window.event;if(e.target)focused=e.target;else if(e.srcElement)focused=e.srcElement;if(focused.nodeType==3)focused=focused.parentNode;console.log("focused is: "+focused);if(document.querySelector){console.log("focused.id is: "+focused.id);return focused.id}else if(!focused||focused==document.documentElement){console.log("focused is: "+focused);return focused}}function focusOnClick(e){console.log("e is: "+e);console.log("this is: "+this);this.select();console.log("Select Me!");this.style.textAlign="center"}}();