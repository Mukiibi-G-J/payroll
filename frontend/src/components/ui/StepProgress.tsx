import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  id: number;
  title: string;
  description?: string;
}

export interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const StepProgress: React.FC<StepProgressProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-colors',
                    isCompleted && 'bg-s1 border-s1 text-white',
                    isCurrent && 'border-s1 text-s1 bg-white',
                    !isCompleted &&
                      !isCurrent &&
                      'border-strokeColor text-bodyText bg-white'
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isCurrent ? 'text-s1' : 'text-bodyText'
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-bodyText mt-1 hidden sm:block">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 -mt-12 transition-colors',
                    isCompleted ? 'bg-s1' : 'bg-strokeColor'
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
