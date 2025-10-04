import { useState, useEffect } from 'react';
import { QRCodeType, QRCodeData, QRCustomization } from '../../types';
import { QRTypeSelector } from './QRTypeSelector';
import { ContentForm } from './ContentForm';
import { SecurityOptions } from './SecurityOptions';
import { CustomizationPanel } from './CustomizationPanel';
import { QRPreview } from './QRPreview';
import { useQRCodes } from '../../hooks/useQRCodes';
import { ChevronRight, ChevronLeft, Download, Share2, Check, RefreshCw, Copy } from 'lucide-react';
import { ScanVerifier } from './ScanVerifier';

// Define the steps for QR code generation
type GenerationStep = 'type' | 'content' | 'security' | 'customize' | 'result';

// Add this at the top of the file after imports

declare global {
  interface Window {
    QRCode?: {
      toDataURL: (content: string, options: unknown) => Promise<string>;
    };
  }
}

export function QRGenerator() {
  const { createQRCode } = useQRCodes();
  const [currentStep, setCurrentStep] = useState<GenerationStep>('type');
  const [qrType, setQRType] = useState<QRCodeType>('url');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    password: '',
    expiryDate: '',
    usageLimit: '',
    geoRadius: ''
  });
  const [securityOptions, setSecurityOptions] = useState({
    encrypted: undefined as boolean | undefined,
    hasPassword: undefined as boolean | undefined,
    biometricLock: undefined as boolean | undefined,
    isDynamic: undefined as boolean | undefined,
    geoFencing: undefined as boolean | undefined
  });
  const [customization, setCustomization] = useState<QRCustomization>({
    size: 256,
    errorCorrection: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#FFFFFF',
    logoUrl: '',
    logoSize: 0,
    cornerRadius: 0,
    dotStyle: 'square',
    eyeStyle: 'square',
    gradientEnabled: false,
    gradientColors: ['#00D9FF', '#FF6B6B'],
    gradientDirection: 'horizontal',
    frameEnabled: false,
    frameColor: '#000000',
    frameWidth: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQR, setGeneratedQR] = useState<QRCodeData | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Progress tracker
  const steps: Array<{ id: GenerationStep; label: string }> = [
    { id: 'type', label: 'Type' },
    { id: 'content', label: 'Content' },
    { id: 'security', label: 'Security' },
    { id: 'customize', label: 'Style' },
    { id: 'result', label: 'Result' },
  ];
  
  // Auto-show preview on tablet/desktop
  useEffect(() => {
    const handleResize = () => {
      setShowPreview(window.innerWidth >= 1024); // lg breakpoint
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation functions
  const nextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };
  
  const prevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };
  
  // Form validation
  const canProceed = () => {
    switch (currentStep) {
      case 'type': 
        return true;
      case 'content': 
        return formData.content.trim().length > 0;
      case 'security':
      case 'customize':
        return true;
      default:
        return true;
    }
  };
  
  // Copy content to clipboard
  const copyToClipboard = () => {
    if (!formData.content) return;
    navigator.clipboard.writeText(formData.content)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => console.error('Failed to copy:', err));
  };

  const handleGenerate = async () => {
    if (!formData.content.trim()) return;

    setIsGenerating(true);

    try {
      const { geoFencing, ...restSecurityOptions } = securityOptions;
      const qrData: Partial<QRCodeData> = {
        type: qrType,
        title: formData.title || `${qrType.toUpperCase()} QR Code`,
        content: formData.content,
        customization: customization,
        ...restSecurityOptions,
  ...(geoFencing ? { geoFencingEnabled: true } : {}),
  expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined
      };

      // Create QR code with optimized scanner compatibility
      const newQR = await createQRCode(qrData);
      setGeneratedQR({
        ...newQR,
        scanCount: newQR.scanCount ?? 0,
        isFavorite: newQR.isFavorite ?? false,
        tags: newQR.tags ?? [],
        isPublic: newQR.isPublic ?? false,
      });
      setCurrentStep('result');
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Render content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 'type':
        return (
          <div className="animate-fadeIn">
            <QRTypeSelector 
              selectedType={qrType} 
              onTypeChange={setQRType} 
            />
          </div>
        );
      
      case 'content':
        return (
          <div className="animate-fadeIn">
            <ContentForm
              type={qrType}
              formData={formData}
              onChange={(data: Record<string, unknown>) => setFormData(prev => ({ ...prev, ...data }))}
            />
          </div>
        );
      
      case 'security':
        return (
          <div className="animate-fadeIn">
            <SecurityOptions
              options={securityOptions}
              onChange={(options) => setSecurityOptions(prev => ({ ...prev, ...options }))}
              formData={formData}
              onFormDataChange={(data) => setFormData(prev => ({
                ...prev,
                ...Object.fromEntries(
                  Object.entries(data).map(([key, value]) => [key, value === undefined || value === null ? '' : String(value)])
                )
              }))}
            />
          </div>
        );
      
      case 'customize':
        return (
          <div className="animate-fadeIn">
            <CustomizationPanel
              customization={customization}
              onChange={setCustomization}
            />
          </div>
        );
      
      case 'result':
        return (
          <div className="animate-fadeIn space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Check className="w-5 h-5 text-green-400 mr-2" />
                Your QR Code is Ready!
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-gray-300">
                    <span className="text-gray-400 block">Title:</span> 
                    {generatedQR?.title}
                  </p>
                  
                  <div>
                    <span className="text-gray-400 block">Content:</span>
                    <div className="flex items-center mt-1">
                      <div className="bg-gray-800 text-gray-300 p-2 rounded flex-1 text-sm truncate">
                        {generatedQR?.content}
                      </div>
                      <button 
                        onClick={copyToClipboard}
                        className="ml-2 p-2 bg-gray-800 rounded text-gray-400 hover:text-white"
                      >
                        {copySuccess ? <Check size={18} /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      onClick={() => setCurrentStep('type')}
                      className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      <RefreshCw size={18} className="mr-2" />
                      Create New QR Code
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-white/5 p-2">
                    {generatedQR && <img 
                      src={generatedQR?.imageUrl || ''} 
                      alt="Generated QR Code (works with Google Lens, iPhone, Android, all scanners)" 
                      className="w-40 h-40 mx-auto"
                    />}
                  </div>
                  <div className="text-xs text-gray-400 text-center max-w-xs">
                    <span>
                      This QR code works with Google Lens, iPhone Camera, Android, and all major QR scanner apps. For best results, use high contrast colors.
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center transition-colors duration-200"
                      onClick={() => {
                        if (!generatedQR) return;
                        const link = document.createElement('a');
                        link.href = generatedQR.imageUrl || '';
                        link.download = `${generatedQR.title.replace(/\s+/g, '_')}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download size={16} className="mr-2" /> Download
                    </button>
                    <button
                      className="bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 px-4 rounded-lg flex items-center transition-colors duration-200"
                      onClick={() => {
                        if (navigator.share && generatedQR?.imageUrl) {
                          fetch(generatedQR.imageUrl)
                            .then(res => res.blob())
                            .then(blob => {
                              const file = new File([blob], `${generatedQR.title.replace(/\s+/g, '_')}.png`, { type: 'image/png' });
                              navigator.share({
                                title: generatedQR?.title || 'My QR Code',
                                text: `Check out my QR code: ${generatedQR?.title}`,
                                files: [file]
                              }).catch((error) => console.log('Error sharing', error));
                            });
                        }
                      }}
                    >
                      <Share2 size={16} className="mr-2" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-950 py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">Generate QR Code</h2>
            <p className="text-gray-400">Create secure, dynamic QR codes with advanced features</p>
          </div>

          {/* Step Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <button
                    onClick={() => index <= steps.findIndex(s => s.id === currentStep) && setCurrentStep(step.id)}
                    disabled={index > steps.findIndex(s => s.id === currentStep)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                      currentStep === step.id
                        ? 'bg-cyan-500 text-white'
                        : index < steps.findIndex(s => s.id === currentStep)
                          ? 'bg-cyan-900 text-cyan-200 cursor-pointer'
                          : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {index + 1}
                  </button>
                  <span className={`text-xs mt-1 ${
                    currentStep === step.id
                      ? 'text-cyan-400'
                      : index < steps.findIndex(s => s.id === currentStep)
                        ? 'text-gray-400'
                        : 'text-gray-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="h-1 bg-gray-800 mt-4 mb-6 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300"
                style={{
                  width: `${((steps.findIndex(s => s.id === currentStep) + 1) / steps.length) * 100}%`
                }}
              ></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {renderStepContent()}
              {/* Navigation buttons */}
              {currentStep !== 'result' && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 'type'}
                    className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} className="mr-1" /> Back
                  </button>
                  {currentStep === 'customize' ? (
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !formData.content.trim()}
                      className="flex items-center px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw size={18} className="mr-2 animate-spin" /> 
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate QR <ChevronRight size={18} className="ml-1" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next <ChevronRight size={18} className="ml-1" />
                    </button>
                  )}
                </div>
              )}
              {/* Scan Verifier Entry Point */}
              <div className="mt-8">
                <ScanVerifier />
              </div>
            </div>
            {/* Preview Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <QRPreview
                  qrData={generatedQR}
                  isGenerating={isGenerating}
                  showPreview={showPreview || currentStep === 'result'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}