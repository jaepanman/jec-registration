
import React from 'react';

const steps = [
  { id: 1, name: '種別' },
  { id: 2, name: '基本情報' },
  { id: 3, name: '希望コース' },
  { id: 4, name: '同意事項' },
  { id: 5, name: '確認' }
];

interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center space-x-2">
      {steps.map((step, idx) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors
              ${currentStep >= step.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}
            `}>
              {step.id}
            </div>
            <span className={`ml-2 hidden lg:inline text-xs font-medium whitespace-nowrap ${currentStep >= step.id ? 'text-blue-600' : 'text-slate-400'}`}>
              {step.name}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div className={`w-4 h-px ${currentStep > step.id ? 'bg-blue-600' : 'bg-slate-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
