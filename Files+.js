(function (Scratch) {
  'use strict';

  class FilesPlusExtension {
    getInfo() {
      return {
        id: 'filesplus',
        name: 'Files+',
        blockIconURI: '', // Add an icon data URI here later if you want one
        color1: '#FFBF00', // Primary yellow for the blocks
        color2: '#E6AC00', // Darker yellow for block edges when clicked
        blocks: [
          // 1. Download File Block
          {
            opcode: 'downloadFileBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'download file [file] as [name] in folder [folder]',
            arguments: {
              file: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello world!'
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'bro.txt'
              },
              folder: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Test'
              }
            }
          },
          // 2. Create Folder Block
          {
            opcode: 'createFolderBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create folder [cf]',
            arguments: {
              cf: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Test'
              }
            }
          }
        ]
      };
    }

    // Execution logic for downloading files (maps your file, name, folder IDs)
    downloadFileBlock(args) {
      const blob = new Blob([args.file], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = args.folder ? `${args.folder}/${args.name}` : args.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    // Execution logic for creating a folder (maps your cf ID)
    createFolderBlock(args) {
      const blob = new Blob([new Uint8Array()], { type: 'application/zip' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${args.cf}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  Scratch.extensions.register(new FilesPlusExtension());
})(Scratch);

