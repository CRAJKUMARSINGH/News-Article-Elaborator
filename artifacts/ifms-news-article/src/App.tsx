import { useState, useCallback, useEffect } from 'react';
import JSZip from 'jszip';
import {
  FileText,
  Download,
  Printer,
  Twitter,
  Facebook,
  Link2 as LinkIcon,
  User,
  Calendar,
  MapPin,
  AlertTriangle,
  Clock,
  Upload
} from 'lucide-react';
import {
  generateArticleFileName,
  STATEHIGHWAY32_METADATA
} from './lib/articleUtils';
import UploadPanel from './components/UploadPanel';
import ArticleContent from './components/ArticleContent';
import { processFiles, ProcessedFile } from './lib/fileProcessor';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  return (
    <div
      style={{
        animation: 'fadeIn 0.6s ease-out forwards',
        animationDelay: `${delay}s`,
        opacity: 0
      }}
    >
      {children}
    </div>
  );
};

const Chapter = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => {
  return (
    <FadeIn delay={0.1}>
      <div className="relative my-16">
        <div className="text-[10rem] font-display font-bold text-primary/5 absolute -top-16 -left-8 leading-none pointer-events-none">
          {number}
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 relative z-10 pl-8">
          {title}
        </h2>
        <div className="prose prose-lg max-w-none pl-8">
          {children}
        </div>
      </div>
    </FadeIn>
  );
};

function App() {
  const [copied, setCopied] = useState(false);
  const [uploadPanelOpen, setUploadPanelOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFile[]>([]);

  useEffect(() => {
    try {
      document.title = "अपने दुर्भाग्य को कौसता स्टेट हाईवे 32 — Jan Sanvaddata";

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'State Highway 32: 50 वर्ष से राष्ट्रीय राजमार्ग की प्रतीक्षा — जनजाति क्षेत्र के यातायात का दुखद सफर');
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', 'अपने दुर्भाग्य को कौसता स्टेट हाईवे 32');
      }

      const ogDescription = document.querySelector('meta[property="og:description"]');
      if (ogDescription) {
        ogDescription.setAttribute('content', 'State Highway 32: 50 वर्ष से राष्ट्रीय राजमार्ग की प्रतीक्षा');
      }

      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (twitterTitle) {
        twitterTitle.setAttribute('content', 'अपने दुर्भाग्य को कौसता स्टेट हाईवे 32');
      }

      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      if (twitterDescription) {
        twitterDescription.setAttribute('content', 'State Highway 32: 50 वर्ष से राष्ट्रीय राजमार्ग की प्रतीक्षा');
      }
    } catch (err) {
      console.error("Failed to update meta tags:", err);
    }
  }, []);

  const generateFileName = useCallback(() => {
    return generateArticleFileName(STATEHIGHWAY32_METADATA);
  }, []);

  const handleSaveAsPDF = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
        const input = document.createElement('input');
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, []);

  const handleSaveAsDoc = useCallback(async () => {
    try {
      // Get the article content from the DOM
      const articleElement = document.querySelector('article');
      if (!articleElement) {
        alert('Could not find article content. Please try using Print PDF instead.');
        return;
      }

      const articleContent = articleElement.innerHTML;
      
      // Get the article title for display
      const titleElement = document.querySelector('h1');
      const title = titleElement?.textContent || 'Article';
      
      // Use the pre-built filename generator — works correctly with Hindi/non-ASCII titles
      // e.g. "2026-10-01-state-highway-32-the-road-of-misfortune"
      const folderName = generateFileName();
      
      const fullHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <style>
            body { font-family: 'Times New Roman', Arial, sans-serif; line-height: 1.6; margin: 40px; }
            h1 { color: #1E3A5F; font-size: 24pt; }
            h2 { color: #0D9488; border-left: 4px solid #0D9488; padding-left: 10px; font-size: 18pt; }
            h3 { color: #1E3A5F; font-size: 14pt; }
            p { font-size: 12pt; }
            strong { color: #1E3A5F; }
            blockquote { background: #FEF3C7; padding: 15px; margin: 15px 0; border-left: 4px solid #B45309; font-style: italic; }
            ul { margin: 10px 0; padding-left: 20px; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          ${articleContent}
        </body>
        </html>
      `;

      // Create a ZIP file with subfolder structure
      const zip = new JSZip();
      const htmlFileName = `${folderName}.html`;
      
      // Add the HTML file to a subfolder named after the article title
      zip.file(`${folderName}/${htmlFileName}`, fullHtml);
      
      // Generate the ZIP file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Download the ZIP file
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${folderName}.zip`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      alert(`Article saved!\nZIP: ${folderName}.zip\nSubfolder: ${folderName}/\nOpen the .html file inside the folder with Word or any browser.`);
    } catch (err) {
      console.error('Failed to save:', err);
      alert('Failed to save file. Please try using Print PDF instead.');
    }
  }, [generateFileName]);

  const articleUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : "http://localhost:3000"
  );
  const shareText = encodeURIComponent(
    "State Highway 32: 50 वर्ष से राष्ट्रीय राजमार्ग की प्रतीक्षा, जनजाति क्षेत्र के यातायात का दुखद सफर"
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="text-primary" size={20} />
            <span className="font-sans font-bold text-primary text-sm">जन संवाददाता</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setUploadPanelOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white rounded-sm hover:bg-accent/90 transition-colors text-sm font-medium"
              aria-label="Upload files"
            >
              <Upload size={16} aria-hidden="true" />
              <span>Upload</span>
            </button>
            <button
              onClick={handleSaveAsPDF}
              className="flex items-center gap-2 px-3 py-1.5 bg-destructive text-destructive-foreground rounded-sm hover:bg-destructive/90 transition-colors text-sm font-medium"
              aria-label="Save as PDF"
            >
              <Printer size={16} aria-hidden="true" />
              <span>Save PDF</span>
            </button>
            <button
              onClick={handleSaveAsDoc}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors text-sm font-medium"
              aria-label="Save as ZIP"
            >
              <Download size={16} aria-hidden="true" />
              <span>Save ZIP</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <FadeIn>
          <article className="prose prose-lg max-w-none">
            <header className="mb-12">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-sans">
                <Calendar size={16} aria-hidden="true" />
                <time>1 October 2026</time>
                <span>•</span>
                <span>Infrastructure</span>
                <span>•</span>
                <MapPin size={16} aria-hidden="true" />
                <span>Rajasthan</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 leading-tight">
                अपने दुर्भाग्य को कौसता स्टेट हाईवे 32
              </h1>

              <h2 className="text-2xl md:text-3xl font-display font-semibold text-muted-foreground mb-6">
                State Highway 32: The Road of Misfortune
              </h2>

              <div className="w-24 h-1 bg-accent mx-auto mb-8" />

              <p className="text-xl md:text-2xl font-serif text-muted-foreground italic mb-10 max-w-2xl mx-auto leading-relaxed">
                अपने दुर्भाग्य को कौसता स्टेट हाईवे 32 — 50 वर्ष से राष्ट्रीय राजमार्ग की प्रतीक्षा — जनजाति क्षेत्र के यातायात का दुखद सफर
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 font-sans text-sm mb-12 border-y border-border py-4">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-accent" />
                  <span className="font-semibold text-foreground uppercase tracking-wider">
                    संवाददाता | Reporter
                  </span>
                </div>
                <span className="hidden md:inline text-muted-foreground">•</span>
                <div className="text-muted-foreground flex items-center gap-2">
                  Special Correspondent, Infrastructure Bureau
                </div>
                <span className="hidden md:inline text-muted-foreground">•</span>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" />
                  <span>8 min read</span>
                </div>
              </div>

              <div className="bg-primary text-primary-foreground p-6 rounded-sm mb-8">
                <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle size={20} aria-hidden="true" />
                  मुख्य तथ्य (Key Facts)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="block">165 किमी</strong>
                      <span className="text-sm opacity-90">Udaipur से Banswara तक की महत्वपूर्ण सड़क</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="block">50 वर्ष</strong>
                      <span className="text-sm opacity-90">से राष्ट्रीय राजमार्ग घोषित होने की प्रतीक्षा</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="block">95 किमी</strong>
                      <span className="text-sm opacity-90">टोल सड़क जिसकी अवधि 2020 में समाप्त</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="block">15 वर्ष</strong>
                      <span className="text-sm opacity-90">जनजाति क्षेत्र के निवासियों को टोल देना पड़ा, फिर भी टूटी-फूटी सड़क</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="block">9 किमी</strong>
                      <span className="text-sm opacity-90">वन विभाग क्षेत्र से गुजर रही इस सड़क का हिस्सा जो 2026 तक उपेक्षित रही</span>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <Chapter number={1} title="अध्याय 1: सड़क का परिचय और महत्व (Introduction & Importance)">
              <p className="article-opener">हम बात कर रहे हैं स्टेट हाईवे 32 की जिसका उद्गम पाली जिले की बड़ी सदरी से किमी जीरो के रूप में शुरू हो रहा है। यह 265 किलोमीटर लंबा मार्ग राजस्थान के दक्षिणी भाग से गुजरता है। रास्ते में रणकपुर के प्राचीन जैन मंदिर, सायरा की शांत वादियां, गोगुंदा के ग्रामीण क्षेत्र, उदयपुर — झीलों का शहर, जौसमंद का विशाल जलाशय, सलुंबर की आदिवासी बस्तियां, असपुर के हरे-भरे जंगल, पालोड़ा की पहाड़ियां, और लोहरिया की घाटियां होते हुए बांसवाड़ा में समाप्त होता है।</p>
              <p>इस हाईवे में उदयपुर एक्जैक्ट 100 किमी पर पड़ता है — एक महत्वपूर्ण भौगोलिक बिंदु जो इस सड़क को दो भागों में बांटता है। किमी 100 से 265 का हिस्सा उदयपुर से बांसवाड़ा को जोड़ने का सबसे महत्वपूर्ण रोड है। यह दक्षिणी राजस्थान की आर्थिक गतिविधियों के लिए जीवन रेखा की तरह है।</p>
              <p><strong>जिस सड़क को राष्ट्रीय राजमार्ग होकर उदयपुर-चित्तौड़ से बेहतर सड़क होनी थी और टोल विहीन होनी थी — उस सड़क की वर्तमान हालत व्यक्त करने योग्य नहीं है।</strong> आज यह सड़क गड्ढों से भरी है, मानसून में यात्रा असंभव हो जाती है, और दुर्घटनाओं की संख्या बढ़ती जा रही है।</p>
              <p><strong>मज़ेदार बात यह है कि इसे राष्ट्रीय राजमार्ग घोषित करने के लिए कोई राजनीतिक आवेदन भी pending नहीं है।</strong> 50 वर्ष की प्रतीक्षा के बाद भी, दिल्ली में कोई file नहीं भेजी गई — यह बात अपने आप में सब कुछ बयान करती है। यह सिर्फ उपेक्षा नहीं है, यह जानबूझकर की गई उपेक्षा है।</p>
              <p><strong>यह सड़क जोधपुर से रतलाम-इंदौर को उदयपुर से shortest distance में जोड़ती है।</strong> तुलनात्मक दृष्टि से देखें तो बांसवाड़ा क्षेत्र के लिए कम महत्व की प्रतापगढ़ और डूंगरपुर सड़कें राष्ट्रीय राजमार्ग बन चुकी हैं। यह बात उजागर करती है कि यह सड़क कितनी important है और फिर भी उपेक्षित क्यों है।</p>
            </Chapter>

            <FadeIn delay={0.2}>
              <blockquote className="my-12 p-6 bg-amber-100 border-l-4 border-amber-600 italic text-foreground">
                <p className="text-lg">"50 वर्ष से राष्ट्रीय राजमार्ग की प्रतीक्षा — उदयपुर से बांसवाड़ा की सबसे महत्वपूर्ण सड़क, फिर भी उपेक्षित।"</p>
              </blockquote>
            </FadeIn>

            <Chapter number={2} title="अध्याय 2: BOT परियोजनाओं की राजनीति (BOT Project Politics)">
              <p>BOT (Build Operate Transfer) आधारित प्रोजेक्ट्स के भाग्य भरोसे छोड़ने की राजनीति इस बात का द्योतक है कि राज्य सरकार की नजरों में यह सर्वाधिक उपेक्षित सड़क है। BOT मॉडल में निजी कंपनियां सड़क बनाती हैं, टोल वसूल करती हैं, और एक निर्धारित अवधि के बाद सड़क सरकार को सौंप देती हैं। लेकिन जब टोल अवधि समाप्त हो जाती है, तो सरकार की जिम्मेदारी बढ़ जाती है — जो यहां पूरी तरह से नदारद रही है।</p>
              <p>सड़क का सलुंबर-असपुर-बांसवाड़ा पार्ट जो कि 95 किमी है, एक टोल सड़क के रूप में निर्मित हुआ। इसकी टोल अवधि 2020 में समाप्त हो गई। 15 वर्षों तक लोगों ने टोल दिया, उम्मीद थी कि अब टोल-मुक्त सड़क मिलेगी। लेकिन हकीकत यह है कि टोल के बाद भी सड़क की हालत बद से बदतर होती गई।</p>
              <p>सड़क की ट्रैफिक घनत्व के मद्देनजर और विभाग की निर्धारित सड़क नवीकरण की नीति के हिसाब से हर तीन वर्ष में इस सड़क पर नया डामरीकरण 2023 और 2026 में किया जाना था। यह एक मानक प्रक्रिया है जो सड़क की लंबी उम्र सुनिश्चित करती है। लेकिन इस सड़क पर यह प्रक्रिया कभी नहीं अपनाई गई।</p>
              <p><strong>परंतु यह आलेख लिखते तक नवीकरण तो दूर, साधारण पैच रिपेयर की भी कोई राज्य योजना नजर नहीं आती।</strong> लाखों रुपये टोल के रूप में वसूले गए, लेकिन सड़क के रखरखाव पर एक पैसा भी खर्च नहीं किया गया। यह लापरवाही और उपेक्षा का चरम उदाहरण है।</p>
            </Chapter>

            <Chapter number={3} title="अध्याय 3: जनजाति क्षेत्र के यातायात का दुखद सफर (TRIBAL AREA RESIDENTS' Plight)">
              <p>उदोग व्यवसाय विहीन जनजाति यातायात को लगभग 15 वर्ष टोल देते रहना पड़ा। ये आदिवासी समुदाय दक्षिणी राजस्थान के सबसे कमजोर आर्थिक स्थिति में रहते हैं। उनकी आय सीमित है, लेकिन टोल का बोझ उन पर सबसे भारी पड़ा। हर छोटी यात्रा के लिए उन्हें टोल देना पड़ता था — चाहे वह अस्पताल जाना हो, बाजार जाना हो, या बच्चों को स्कूल भेजना हो।</p>
              <p>और आज फिर टूटी-फूटी असुरक्षित सड़क ही उनके नसीब में है। मानसून के मौसम में तो स्थिति और भी भयावह हो जाती है। गड्ढों से भरी सड़क, खतरनाक मोड़, और बिना रेलिंग के पुल — यह सब उनके लिए रोज़ की ज़िंदगी है। दुर्घटनाएं आम हैं, लेकिन मदद का कोई इंतज़ाम नहीं।</p>
              <p>असपुर के आसपास की सड़क तो हमेशा अपेक्षित रही। आज भी वैसी ही है। यह एक दुखद स्थिति है जहां जनजाति क्षेत्र के निवासियों ने सालों तक टोल दिया, लेकिन बदले में उन्हें बेहतर सड़क नहीं मिली। उनकी आवाज़ सुनी नहीं गई, उनकी मांगों पर ध्यान नहीं दिया गया, और उन्हें सिस्टम के किनारे पर धकेल दिया गया।</p>
            </Chapter>

            <Chapter number={4} title="अध्याय 4: सलुंबर-उदयपुर सेक्शन की कहानी (Salumbar-Udaipur Section Story)">
              <p>अब कहानी जानते हैं सलुंबर-उदयपुर सेक्शन की। यह 70 किलोमीटर का खंड उदयपुर को दक्षिणी आदिवासी क्षेत्रों से जोड़ता है। यह उदयपुर के पर्यटकों के लिए भी महत्वपूर्ण है जो जौसमंद और आसपास के इलाकों में जाते हैं।</p>
              <p>सरकार बदलने से क्षेत्र को बिना टोल की सड़क से वंचित रहना पड़ा। जब एक सरकार बदली, तो लोगों को उम्मीद थी कि अब टोल का दौर खत्म होगा। लेकिन राजनीतिक दलों के बीच खींचतान का नतीजा यह हुआ कि आम जनता को सबसे ज्यादा नुकसान उठाना पड़ा।</p>
              <p>वसुंधरा सरकार ने अपने कार्यकाल में राज्य की टोल नीति (एक ही सड़क के टोल बूथ के 50 किमी दायरे में नया टोल नहीं लगाया जाएगा) को धता बता कर सलुंबर-उदयपुर सेक्शन RSRDC को टोल सड़क निर्माण करने हेतु भूमि दे दी। यह एक विवादास्पद निर्णय था जिसने स्थानीय लोगों का विश्वास तोड़ दिया।</p>
              <p><strong>और यह अभिशप्त सड़क इस सेक्शन में इस टोल का दंश भोग रही है।</strong> आज भी लोगों को टोल देना पड़ता है, और सड़क की हालत बद से बदतर होती जा रही है। यह एक दुखद सच है कि राजनीतिक स्वार्थ के चलते जनता की सुविधाओं से समझौता किया जाता है।</p>
            </Chapter>

            <Chapter number={5} title="अध्याय 5: डाक-पलटा घाटी की उपेक्षा (Dak-Palta Ghati Neglect)">
              <p>इसमें डाक-पलटा घाटी केवड़ा के पास के 9 किमी सड़क को वन विभाग से छोड़ दी जानी थी। यह घाटी भौगोलिक रूप से बहुत महत्वपूर्ण है — यह उदयपुर और बांसवाड़ा के बीच सबसे कठिन और खतरनाक मार्ग है। यहां पहाड़ियां ऊंची हैं, मोड़ तीक्ष्ण हैं, और मानसून में भूस्खलन का खतरा बना रहता है।</p>
              <p>इस विषय में RSRDC ने आज तक कुछ नहीं किया और यह वर्ष 2026 तक उपेक्षित रही। वन विभाग की अनुमति और समन्वय की कमी के कारण यह खंड वर्षों से अधूरा पड़ा है। स्थानीय लोगों ने कई बार शिकायत की, लेकिन कोई कार्रवाई नहीं हुई।</p>
              <p><strong>सौभाग्य से 2026 में सांसद महोदय के हस्तक्षेप से मामूली डामरीकरण हुआ</strong>, उसमें भी डाक पलटा घाटी के पास CD work के अभाव में दो बार अंधाधुंध किए रिपेयर का पैसा व्यर्थ हो गया। यह एक दुखद उदाहरण है कि कैसे बिना तकनीकी विशेषज्ञता के काम कराने से सरकारी पैसा बर्बाद होता है।</p>
              <p>बुद्धिमान अभियंताओं की प्रशंसा करते हैं — यह एक गंभीर खराबी है जहां बिना उचित योजना के पैसा बर्बाद किया गया। सही समय पर सही तरीके से काम कराया जाता तो आज यह घाटी एक बेहतरीन सड़क होती। लेकिन लापरवाही और अनुशासनहीनता ने सब बर्बाद कर दिया।</p>
              <p><strong>मुकंदरा टाइगर रिजर्व से गुजरने वाली कोटा की मुकंदरा घाटी की सड़क का नक्शा strong political will ने बदल दिया।</strong> लेकिन केवड़ा की नाल सड़क को सुगम करने के लिए उससे भी ज्यादा प्रबल इच्छा शक्ति की जरूरत है। यह सिर्फ इंजीनियरिंग का सवाल नहीं है — यह राजनीतिक संकल्प का सवाल है।</p>
            </Chapter>

            <Chapter number={6} title="अध्याय 6: हमारी प्रमुख अपेक्षाएं (Our Main Expectations)">
              <p>इस सड़क के विकास के लिए हमारी प्रमुख मांगें हैं:</p>
              <ul>
                <li>
                  <strong>राज्य सरकार सलुंबर से बांसवाड़ा सड़क का तत्काल नवीकरण कराए:</strong> यह 95 किमी लंबा महत्वपूर्ण हिस्सा है जिसकी टोल अवधि समाप्त हो चुकी है।
                </li>
                <li>
                  <strong>वन क्षेत्र की 9 किमी सड़क का सुधारीकरण तुरंत हो:</strong> डाक-पलटा घाटी का यह हिस्सा वर्षों से उपेक्षित है।
                </li>
                <li>
                  <strong>केवड़ा की नाल क्षेत्र में सुरंग या ओवर ब्रिज आदि से कोटा दर्रा क्षेत्र की सड़क (मुकंदरा टाइगर रिजर्व से गुजर रहे NH-52 की तर्ज पर) विकास कर सड़क सुगम की जाए:</strong> यह एक लंबी अवधि का समाधान होगा जो सड़क को स्थायी बनाएगा।
                </li>
              </ul>
            </Chapter>

            <Chapter number={7} title="अध्याय 7: निष्कर्ष (Conclusion)">
              <p>स्टेट हाईवे 32 की कहानी राजस्थान की सड़क बुनियादी ढांचे की उपेक्षा का एक दर्दनाक उदाहरण है। 50 वर्ष से राष्ट्रीय राजमार्ग बनने की प्रतीक्षा, टोल के दलदल में फंसी सड़क, और जनजाति क्षेत्र के यातायात का दुखद सफर — यह सब एक साथ दिखता है। यह केवल एक सड़क की कहानी नहीं है, यह पूरी प्रणाली की विफलता की कहानी है।</p>
              <p><strong>सबसे गंभीर बात यह है कि इस सड़क की महत्व के बावजूद यह सर्वाधिक उपेक्षित रही है।</strong> टोल आधारित परियोजनाओं के भाग्य भरोसे छोड़ने की राजनीति ने इस सड़क को और बदतर बना दिया है। जब टोल वसूला गया, तो विकास का वादा किया गया। लेकिन वादे तोड़ दिए गए, और जनता को ठगा गया।</p>
              <p>जनजाति क्षेत्र के निवासियों ने 15 वर्ष तक टोल दिया, लेकिन बदले में उन्हें टूटी-फूटी असुरक्षित सड़क मिली। डाक-पलटा घाटी का 9 किमी हिस्सा वर्षों से उपेक्षित रहा, और जब कुछ काम हुआ तो वह भी बिना योजना के अंधाधुंध रिपेयर के रूप में। यह विश्वासघात है — जनता का विश्वास तोड़ना है।</p>
              <p><strong>हमारी प्रमुख अपेक्षा सरल है:</strong> राज्य सरकार सलुंबर से बांसवाड़ा सड़क का तत्काल नवीकरण कराए, वन क्षेत्र की 9 किमी सड़क का सुधारीकरण तुरंत हो, और केवड़ा की नाल क्षेत्र में सुरंग या ओवर ब्रिज का निर्माण हो। ये मांगें अवास्तव नहीं हैं — ये जनता का अधिकार हैं।</p>
              <p>केवल तब ही यह सड़क अपने दुर्भाग्य से मुक्त हो पाएगी और उदयपुर से बांसवाड़ा का सफर सुगम हो पाएगा। लेकिन इसके लिए जनता को एकजुट होना होगा, आवाज़ उठानी होगी, और सरकार को जवाबदेह ठहराना होगा। यह सड़क अब सिर्फ राजनीति का मुद्दा नहीं है — यह लाखों लोगों की ज़िंदगी का सवाल है।</p>
            </Chapter>

            <FadeIn delay={0.5}>
              <blockquote className="my-12 p-6 bg-amber-100 border-l-4 border-amber-600 italic text-foreground">
                <p className="text-lg">"50 वर्ष की प्रतीक्षा, 15 वर्ष का टोल, फिर भी टूटी-फूटी सड़क — यही है स्टेट हाईवे 32 की कहानी।"</p>
              </blockquote>
            </FadeIn>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-border share-section">
              <h3 className="font-sans font-bold text-lg text-primary mb-4">
                Share this article
              </h3>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${articleUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-sm hover:bg-[#1a8cd8] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} aria-hidden="true" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#4267B2] text-white rounded-sm hover:bg-[#375695] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} aria-hidden="true" />
                  <span className="text-sm font-medium">Facebook</span>
                </a>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground border border-border rounded-sm hover:bg-secondary/80 transition-colors"
                  aria-label="Copy link to clipboard"
                >
                  <LinkIcon size={16} aria-hidden="true" />
                  <span className="text-sm font-medium">{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            </div>
            </article>
        </FadeIn>

        {uploadedFiles.length > 0 && (
          <FadeIn delay={0.6}>
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="text-2xl font-display font-bold text-primary mb-4">
                Uploaded Content
              </h2>
              <p className="text-muted-foreground mb-6">
                {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded
              </p>
              <ArticleContent files={uploadedFiles} />
            </div>
          </FadeIn>
        )}
      </main>

      <footer className="w-full bg-background border-t border-border py-12 px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <p className="font-sans font-bold text-primary mb-6 uppercase tracking-widest text-sm">
            इस रिपोर्ट को साझा करें
          </p>
          <div className="flex gap-4" role="list" aria-label="Share options">
            <a
              role="listitem"
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter / X"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Twitter size={20} aria-hidden="true" />
            </a>
            <a
              role="listitem"
              href={`https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <Facebook size={20} aria-hidden="true" />
            </a>
            <button
              type="button"
              aria-label="Copy link to clipboard"
              onClick={handleCopyLink}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <LinkIcon size={20} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-8 text-center">
            <p className="font-sans text-sm text-muted-foreground mb-2">
              © 2026 जन संवाददाता. All rights reserved.
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              Independent Investigative Journalism from Rajasthan
            </p>
          </div>
        </div>
      </footer>

      <UploadPanel
        open={uploadPanelOpen}
        onClose={() => setUploadPanelOpen(false)}
        onSubmit={async (files, previousArticle) => {
          console.log('Submitted files:', files);
          console.log('Previous article:', previousArticle);
          
          // Process the uploaded files
          const processed = await processFiles(files);
          setUploadedFiles(processed);
          setUploadPanelOpen(false);
        }}
      />
    </>
  );
}

export default App;
