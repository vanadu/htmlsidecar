    function getImgSwapBlock( indentLevel ) {
      let Appdata, Attributes;
      Attributes = getAttributes();
      Appdata = appController.initGetAppdata();
      // console.log('Attributes is:');
      // console.dir(Attributes);
      let linebreak;
      linebreak = '\n';
      let mobileFilename, mobileSwapStr;
      // !VA Create the mobile image filename: Get the current image file's filename and append the name with '-mob'.
      mobileFilename = Appdata.fname;
      console.log('mobileFilename is: ' + mobileFilename);
      // !VA The regex for appending the filename with '-mob'.
      mobileFilename = mobileFilename.replace(/(.jpg|.png|.gif|.svg)/g, "-mob$1");
      // !VA Set the indentLevel to 1 for now
      // !VA Create the code for the mobile swap TD as a Comment node of the parent td. 
      mobileSwapStr = `[if !mso]><!-->${linebreak}${getIndent(indentLevel)}<span style="width:0; overflow:hidden; float:left; display:none; max-height:0; line-height:0;" class="mobileshow">${linebreak}${getIndent(indentLevel)}<a href="#"><img class="mobileshow" alt=${Attributes.imgAlt} width="${Appdata.sPhonesW}" height="${Appdata.sPhonesH}" src="${mobileFilename}" border="0" style="width: ${Appdata.sPhonesW}px; height: ${Appdata.sPhonesH}px; margin: 0; border: none; outline: none; text-decoration: none; display: block;" /></a>${linebreak}${getIndent(indentLevel)}<!--</span>-->${linebreak}${getIndent(indentLevel)}<!--<![endif]`;
      // !VA Append the mobileSwapStr code to tdInner
      // tdInner.appendChild(mobileSwapStr);
      return mobileSwapStr;
    }