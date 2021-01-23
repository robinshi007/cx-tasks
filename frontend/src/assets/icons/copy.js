const fs = require('fs');
const path = require('path');

const inputSvgDir = 'svg_fluent_ui';
const outputSvgDir = 'svg_selected';

const icons = [
  'WaffleOffice365',
  'Home',
  'Help',
  'Settings',
  'Search',
  'GlobalNavButton',
  'Page',
  'FabricFolder',
  'FabricNewFolder',
  'FabricMovetoFolder',
  'FabricFolderUpload',
  'FabricUserFolder',
  'Pinned',
  'Recent',
  'Sort',
  'SortUp',
  'SortDown',
  'SortLines',
  'SortLinesAscending',
  'Up',
  'Down',
  'Forward',
  'Back',
  'Reply',
  'ReplyAll',
  'Refresh',
  'UpdateRestore',
  'Sync',
  'ChevronUp',
  'ChevronDown',
  'Accept',
  'Cancel',
  'Important',
  'Info',
  'Warning',
  'Error',
  'List',
  'BulletedList',
  'NumberedList',
  'CheckList',
  'GridViewMedium',
  'Table',
  'Photo2',
  'People',
  'Org',
  'Group',
  'Upload',
  'Download',
  'Add',
  'Edit',
  'Cut',
  'Copy',
  'Delete',
  'RevToggleKey',
  'ReturnToSession',
  'Redo',
  'Undo',
  'Link',
  'Share',
  'Mail',
  'Attach',
  'Tag',
  'TagGroup',
  'Embed',
  'Heart',
  'Sunny',
  'ClearNight',
  'More',
  'MoreVertical',
  'CircleRing',
  'StatusCircleCheckmark',
  'StatusCircleErrorX',
  'BacklogList',
];

icons.forEach((i) => {
  let fileName = i + '.svg';
  let inputPath = path.join(inputSvgDir, fileName);
  let outputPath = path.join(outputSvgDir, fileName);
  if (fs.existsSync(inputPath)) {
    console.log(`==> copying ${fileName}`);
    fs.copyFileSync(inputPath, outputPath);
  } else {
    console.log(`!=> file is not exist: ${fileName}`);
  }
});
