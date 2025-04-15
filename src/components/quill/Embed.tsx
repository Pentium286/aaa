import ReactQuill, { Quill } from "react-quill";
let BlockEmbed = Quill.import('formats/video');

export class Video extends BlockEmbed {
  static create(value) {
      var node = super.create(value);
      node.setAttribute('src', value);
      node.setAttribute('width', '100%');
      node.setAttribute('height', '193');
      node.setAttribute('poster', 'https://static.aiwobeauty.com/ailink/videoPoster.png')
      node.setAttribute("controls","controls");
      return node;
  }

  static value(node) {
      return node.getAttribute('src');
  }
}
Video.blotName = 'video';
Video.tagName = 'Video';
Video.className = 'ql-video';

