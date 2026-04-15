import React, { useMemo, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  LinkNode,
  AutoLinkNode,
  TOGGLE_LINK_COMMAND,
  createLinkMatcherWithRegExp,
} from "@lexical/link";
import { CodeNode } from "@lexical/code";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  SELECTION_CHANGE_COMMAND,
  createCommand,
  DecoratorNode,
  $insertNodes,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $createQuoteNode, $isHeadingNode } from "@lexical/rich-text";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Image as ImageIcon,
  Quote,
  Code2,
  Hash,
  CheckCircle2,
  Database,
  Save,
  Globe,
  FileText,
  Loader2,
  Lock,
} from "lucide-react";
import { ClickableLinkPlugin } from "@lexical/react/LexicalClickableLinkPlugin";
import { upsertPost } from "../../lib/dataService";
import ImageUploadModal from "./ImageUploadModal";

export const INSERT_IMAGE_COMMAND = createCommand();

export class ImageNode extends DecoratorNode {
  __src;
  __altText;

  static getType() {
    return "image";
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  constructor(src, altText, key) {
    super(key);
    this.__src = src;
    this.__altText = altText;
  }

  exportJSON() {
    return {
      type: "image",
      src: this.__src,
      altText: this.__altText,
      version: 1,
    };
  }

  static importJSON(serializedNode) {
    const { src, altText } = serializedNode;
    return new ImageNode(src, altText);
  }

  createDOM() {
    const span = document.createElement("span");
    span.className = "inline-block w-full my-4";
    return span;
  }

  updateDOM() {
    return false;
  }

  decorate() {
    return (
      <figure className="relative group overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
        <img
          src={this.__src}
          alt={this.__altText}
          className="w-full h-auto block select-none"
        />
        {this.__altText && (
          <figcaption className="mt-2 text-center text-xs font-medium text-slate-500 italic pb-2">
            {this.__altText}
          </figcaption>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
      </figure>
    );
  }
}

function ImagesPlugin() {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    return editor.registerCommand(
      INSERT_IMAGE_COMMAND,
      (payload) => {
        const imageNode = new ImageNode(payload.src, payload.altText);
        $insertNodes([imageNode]);
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor]);

  return null;
}

const theme = {
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
  paragraph: "mb-4 text-slate-800 leading-relaxed",
  heading: {
    h1: "text-3xl font-semibold mb-4",
    h2: "text-2xl font-semibold mb-3",
    h3: "text-xl font-semibold mb-2",
  },
  quote: "pl-4 border-l-4 border-sky-500 italic text-slate-700",
  code: "font-mono text-slate-800 bg-slate-100 p-3 rounded-lg",
  list: {
    nested: {
      listitem: "ml-6",
    },
    ol: "list-decimal pl-6",
    ul: "list-disc pl-6",
    listitem: "mb-2",
  },
};

const defaultEditorConfig = {
  theme,
  onError: (error) => {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    LinkNode,
    AutoLinkNode,
    CodeNode,
    ImageNode,
  ],
};

const ToolbarButton = ({ active, label, onClick, icon: Icon }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm font-semibold transition ${
      active
        ? "border-sky-300 bg-sky-100 text-sky-900 shadow-sm"
        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
    }`}
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </button>
);

function ToolbarGroup({ title, children }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-200 last:border-r-0">
      <div className="flex items-center gap-1.5">{children}</div>
    </div>
  );
}

const LexicalErrorBoundary = ({ children }) => <>{children}</>;

function EditorToolbar({
  activeLanguage,
  setActiveLanguage,
  alignment,
  setAlignment,
}) {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [activeBlock, setActiveBlock] = useState("paragraph");
  const [showImageModal, setShowImageModal] = useState(false);

  const handleInsertImage = (data) => {
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
      src: data.src,
      altText: data.altText || "",
    });
  };

  const updateToolbar = React.useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);

      if (elementDOM !== null) {
        if ($isHeadingNode(element)) {
          setActiveBlock(element.getTag());
        } else {
          setActiveBlock(element.getType());
        }
      }
    }
  }, [editor]);

  React.useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_LOW,
    );
  }, [editor, updateToolbar]);

  const focusEditor = () => {
    try {
      editor.focus();
    } catch (error) {
      console.warn("Unable to focus editor", error);
    }
  };

  const insertImage = () => {
    focusEditor();
    setShowImageModal(true);
  };

  const insertLink = () => {
    focusEditor();
    const url = window.prompt("Enter link URL:", "https://");
    if (url) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    }
  };

  const formatHeading = (headingSize) => {
    if (activeBlock !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatQuote = () => {
    if (activeBlock !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatText = (formatType) => {
    focusEditor();
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  const insertBulletList = () => {
    focusEditor();
    editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND);
  };

  const insertOrderedList = () => {
    focusEditor();
    editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND);
  };

  const setTextAlign = (direction) => {
    focusEditor();
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, direction);
    setAlignment(direction);
  };

  return (
    <div className="flex items-center overflow-x-auto no-scrollbar">
      <ToolbarGroup title="Headings & Blocks">
        <ToolbarButton
          active={activeBlock === "h1"}
          label="H1"
          icon={Hash}
          onClick={() => formatHeading("h1")}
        />
        <ToolbarButton
          active={activeBlock === "h2"}
          label="H2"
          icon={Type}
          onClick={() => formatHeading("h2")}
        />
        <ToolbarButton
          active={activeBlock === "h3"}
          label="H3"
          icon={Type}
          onClick={() => formatHeading("h3")}
        />
        <ToolbarButton
          active={activeBlock === "quote"}
          label="Quote"
          icon={Quote}
          onClick={formatQuote}
        />
      </ToolbarGroup>

      <ToolbarGroup title="Text Formatting">
        <ToolbarButton
          active={isBold}
          label="Bold"
          icon={Bold}
          onClick={() => formatText("bold")}
        />
        <ToolbarButton
          active={isItalic}
          label="Italic"
          icon={Italic}
          onClick={() => formatText("italic")}
        />
        <ToolbarButton
          active={isUnderline}
          label="Underline"
          icon={Underline}
          onClick={() => formatText("underline")}
        />
      </ToolbarGroup>

      <ToolbarGroup title="Lists">
        <ToolbarButton
          active={activeBlock === "ul"}
          label="Bullet List"
          icon={List}
          onClick={insertBulletList}
        />
        <ToolbarButton
          active={activeBlock === "ol"}
          label="Ordered List"
          icon={ListOrdered}
          onClick={insertOrderedList}
        />
      </ToolbarGroup>

      <ToolbarGroup title="Alignment">
        <ToolbarButton
          active={alignment === "left"}
          label="Left"
          icon={AlignLeft}
          onClick={() => setTextAlign("left")}
        />
        <ToolbarButton
          active={alignment === "center"}
          label="Center"
          icon={AlignCenter}
          onClick={() => setTextAlign("center")}
        />
        <ToolbarButton
          active={alignment === "right"}
          label="Right"
          icon={AlignRight}
          onClick={() => setTextAlign("right")}
        />
        <ToolbarButton
          active={alignment === "justify"}
          label="Justify"
          icon={AlignJustify}
          onClick={() => setTextAlign("justify")}
        />
      </ToolbarGroup>

      <ToolbarGroup title="Insert">
        <ToolbarButton
          active={false}
          label="Link"
          icon={Link2}
          onClick={insertLink}
        />
        <ToolbarButton
          active={false}
          label="Image"
          icon={ImageIcon}
          onClick={insertImage}
        />
      </ToolbarGroup>

      {showImageModal && (
        <ImageUploadModal
          onClose={() => setShowImageModal(false)}
          onInsert={handleInsertImage}
        />
      )}
    </div>
  );
}

const EditorPane = React.memo(({
  locale,
  alignment,
  setAlignment,
  setWordCount,
  setEditorStateJson,
  isResearch,
  initialStateJson,
}) => {
  const config = useMemo(() => {
    let editorStateStr = undefined;
    try {
      if (initialStateJson) {
        if (typeof initialStateJson === "string" && initialStateJson.trim() !== "" && initialStateJson.trim().startsWith("{")) {
          const parsed = JSON.parse(initialStateJson);
          if (parsed && parsed.root) {
            editorStateStr = initialStateJson;
          }
        } else if (typeof initialStateJson === "object" && initialStateJson !== null && initialStateJson.root) {
          editorStateStr = JSON.stringify(initialStateJson);
        }
      }
    } catch (e) {
      console.warn("Could not parse initial editor state JSON:", e);
    }

    return {
      ...defaultEditorConfig,
      namespace: `editor-${locale}`,
      ...(editorStateStr ? { editorState: editorStateStr } : {}),
    };
  }, [locale, initialStateJson]);

  const onChange = (editorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      if (setWordCount) setWordCount(text.split(/\s+/).filter(Boolean).length);
      setEditorStateJson(editorState.toJSON());
    });
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div className="flex flex-col h-full rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500">
        <div className="border-b border-slate-200 px-4 py-3 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${locale === 'en' ? 'bg-sky-500' : 'bg-emerald-500'}`}></span>
            <span className="text-sm font-bold tracking-tight text-slate-700 capitalize">
              {locale === "en" ? "English Content" : "የአማርኛ ይዘት"}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {locale} Locale
          </span>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Internal Toolbar - Horizontal top bar */}
          <div className="border-b border-slate-100 bg-slate-50/30 p-1 flex items-center overflow-hidden">
            <EditorToolbar
              alignment={alignment}
              setAlignment={setAlignment}
            />
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8">
            <div className="relative max-w-2xl mx-auto h-full">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className="h-full min-h-[600px] outline-none"
                    style={{
                      textAlign: alignment,
                      fontFamily:
                        locale === "am"
                          ? "Noto Sans Ethiopic, Inter, sans-serif"
                          : "Georgia, 'Times New Roman', serif",
                      lineHeight: locale === "am" ? 1.8 : 1.7,
                      fontSize: "1.125rem",
                      color: "#1e293b",
                    }}
                  />
                }
                placeholder={
                  <div className="absolute top-0 left-0 text-slate-400 pointer-events-none select-none italic text-lg">
                    {locale === "en"
                      ? "Begin your English draft here..."
                      : "ጽሁፍዎን እዚህ ይጀምሩ..."}
                  </div>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <HistoryPlugin />
              <OnChangePlugin onChange={onChange} />
              <ListPlugin />
              <LinkPlugin />
              <AutoLinkPlugin
                matchers={[createLinkMatcherWithRegExp(/https?:\/\/\S+/g)]}
              />
              <ClickableLinkPlugin />
              <ImagesPlugin />
            </div>
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
});

export { EditorPane };

export default function App() {
  const [slug, setSlug] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [titleAm, setTitleAm] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAm, setDescAm] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isResearch, setIsResearch] = useState(false);
  const [isSubscribersOnly, setIsSubscribersOnly] = useState(false);
  const [englishAlignment, setEnglishAlignment] = useState("left");
  const [amharicAlignment, setAmharicAlignment] = useState("left"); 
  const [englishStateJson, setEnglishStateJson] = useState(null);
  const [amharicStateJson, setAmharicStateJson] = useState(null);
  
  // Stable initial states to prevent re-rendering loops
  const [englishInitialState, setEnglishInitialState] = useState(null);
  const [amharicInitialState, setAmharicInitialState] = useState(null);
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Client-side hydration from URL
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlSlug = params.get('slug');
    
    if (urlSlug) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const { getPostBySlug } = await import("../../lib/dataService");
          const data = await getPostBySlug(urlSlug);
          
          if (data) {
            setSlug(data.slug || "");
            setTitleEn(data.title_en || "");
            setTitleAm(data.title_am || "");
            setDescEn(data.description_en || "");
            setDescAm(data.description_am || "");
            setCoverImage(data.cover_image || "");
            setIsResearch(data.is_research || false);
            setIsSubscribersOnly(data.subscribers_only || false);
            
            // Set both live state and STABLE initial state
            setEnglishStateJson(data.content_en || null);
            setAmharicStateJson(data.content_am || null);
            setEnglishInitialState(data.content_en || null);
            setAmharicInitialState(data.content_am || null);
          } else {
            setError(`Article "${urlSlug}" not found.`);
          }
        } catch (err) {
          setError("Failed to connect to the database.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  const handlePublish = async () => {
    if (!slug || !titleEn || !titleAm) {
      alert("Please fill in slug and both titles before publishing.");
      return;
    }

    setIsPublishing(true);
    try {
      const { data, error } = await upsertPost({
        slug,
        title_en: titleEn,
        title_am: titleAm,
        description_en: descEn,
        description_am: descAm,
        content_en: englishStateJson,
        content_am: amharicStateJson,
        cover_image: coverImage,
        is_research: isResearch,
        subscribers_only: isSubscribersOnly,
        draft: false,
      });

      if (error) throw error;
      alert("Article published successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to publish: " + err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-6">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl shadow-2xl border border-slate-100 scale-110">
            <Loader2 className="h-10 w-10 text-sky-500 animate-spin" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-slate-800">Hydrating Editor</span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Fetching Article Data...</span>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 animate-in slide-in-from-top-2 duration-300">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-bold italic">!</div>
          <div>
            <p className="font-bold text-sm">Hydration Error</p>
            <p className="text-xs opacity-90">{error}</p>
          </div>
        </div>
      )}

      {/* Post Metadata Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="h-5 w-5 text-sky-500" />
          <h3 className="font-bold text-slate-800 uppercase tracking-wider text-sm">Post Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">URL Slug</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <Hash className="h-4 w-4 text-slate-400 mr-2" />
                <input
                  className="bg-transparent w-full text-sm outline-none font-medium"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="article-slug-name"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Cover Image URL</label>
              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                <ImageIcon className="h-4 w-4 text-slate-400 mr-2" />
                <input
                  className="bg-transparent w-full text-sm outline-none font-medium"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="https://imagekit.io/..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">English Title</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none font-medium focus:ring-2 focus:ring-sky-500/20"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Ex: The Future of Roses"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Amharic Title</label>
              <input
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none font-medium focus:ring-2 focus:ring-emerald-500/20"
                value={titleAm}
                onChange={(e) => setTitleAm(e.target.value)}
                placeholder="ለምሳሌ፡ የጽጌረዳዎች የወደፊት ዕጣ ፈንታ"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-bold text-slate-700">Academic Research</span>
              </div>
              <input
                type="checkbox"
                checked={isResearch}
                onChange={(e) => setIsResearch(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-amber-500" />
                <div>
                  <span className="text-sm font-bold text-slate-700">Subscribers Only</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Hides full content from guests</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isSubscribersOnly}
                onChange={(e) => setIsSubscribersOnly(e.target.checked)}
                className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
            </div>

            <button
              onClick={handlePublish}
              disabled={isPublishing}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-lg transition transform active:scale-95 ${
                isPublishing 
                  ? "bg-slate-400 cursor-not-allowed text-white" 
                  : "bg-sky-600 hover:bg-sky-700 text-white hover:-translate-y-0.5"
              }`}
            >
              <Save className="h-4 w-4" />
              {isPublishing ? "Publishing..." : "Publish Post Now"}
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">English Excerpt</label>
            <textarea
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none h-20 resize-none"
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Short summary for SEO..."
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5 ml-1">Amharic Excerpt</label>
            <textarea
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none h-20 resize-none"
              value={descAm}
              onChange={(e) => setDescAm(e.target.value)}
              placeholder="ለፍለጋ ሞተሮች አጭር ማጠቃለያ..."
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[800px]">
        <EditorPane
          key={`en-${slug}-${isLoading}`}
          locale="en"
          alignment={englishAlignment}
          setAlignment={setEnglishAlignment}
          setEditorStateJson={setEnglishStateJson}
          initialStateJson={englishInitialState}
        />
        <EditorPane
          key={`am-${slug}-${isLoading}`}
          locale="am"
          alignment={amharicAlignment}
          setAlignment={setAmharicAlignment}
          setEditorStateJson={setAmharicStateJson}
          initialStateJson={amharicInitialState}
        />
      </div>
    </div>
  );
}
