// src/components/coding/Compiler.tsx
"use client";

import { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { submitCodingProblem } from "@/app/actions/coding";
import type { CodingProblem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Play, CheckCircle, XCircle } from "lucide-react";

interface CompilerProps {
  problem: CodingProblem;
}

function SubmitButton({ status } : { status?: string | null }) {
  const { pending } = useFormStatus();

  let icon = <Play className="mr-2 h-4 w-4" />;
  let text = "Run & Submit";

  if (pending) {
    icon = <Loader2 className="mr-2 h-4 w-4 animate-spin" />;
    text = "Submitting...";
  } else if (status === "Accepted") {
    icon = <CheckCircle className="mr-2 h-4 w-4 text-green-500" />;
    text = "Accepted!";
  } else if (status && status !== "Submitted" && status !== "Accepted") { // e.g. "Error", "Wrong Answer"
    icon = <XCircle className="mr-2 h-4 w-4 text-red-500" />;
    text = "Try Again";
  }


  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {icon}
      {text}
    </Button>
  );
}


export function Compiler({ problem }: CompilerProps) {
  const [code, setCode] = useState<string>(`// Start coding for ${problem.title} in JavaScript...\nfunction solve() {\n  // Your solution here\n  return null;\n}\n`);
  const [language, setLanguage] = useState<string>("javascript");
  const [state, formAction] = useFormState(submitCodingProblem, null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!state) return; 

    if (state.error && state.status === "Error") {
      toast({
        title: "Error",
        description: state.error,
        variant: "destructive",
      });
    } else if (state.message && state.status === "Submitted") {
      toast({
        title: "Submitted!",
        description: state.message,
        variant: "default",
      });
    } else if (state.message && state.status === "Accepted") { 
       toast({
        title: "Accepted!",
        description: state.message,
        variant: "default", 
      });
    }
  }, [state, toast]);

  return (
    <Card className="shadow-xl w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg text-primary">Code Editor</CardTitle>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <form action={formAction}>
        <CardContent>
          <input type="hidden" name="problemId" value={problem.id} />
          <input type="hidden" name="problemTitle" value={problem.title} />
          <input type="hidden" name="platform" value={problem.platform} />
          <input type="hidden" name="language" value={language} />
          <Textarea
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`// Write your ${language} code here...`}
            className="min-h-[300px] md:min-h-[400px] font-mono text-sm bg-muted/30 border-border focus:border-primary"
          />
          {state?.fieldErrors?.code && <p className="text-xs text-destructive mt-1">{state.fieldErrors.code.join(", ")}</p>}
           {state?.error && !state.fieldErrors && <p className="text-sm text-destructive mt-2">{state.error}</p>}
        </CardContent>
        <CardFooter className="justify-end">
          <SubmitButton status={state?.status} />
        </CardFooter>
      </form>
    </Card>
  );
}
