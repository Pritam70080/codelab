import React from 'react';
import { CheckCircle2, XCircle, Clock, MemoryStick as Memory } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

const SubmissionResults = ({ submission }) => {
  const {theme} = useThemeStore();

  //Parse stringified arrays
  const memoryArr = JSON.parse(submission.memory || '[]');
  const timeArr = JSON.parse(submission.time || '[]');

  //Calculate averages
  const avgMemory = memoryArr
    .map(m => parseFloat(m)) // remove ' KB' using parseFloat
    .reduce((acc, memory) => acc + memory, 0) / memoryArr.length;

  const avgTime = timeArr
    .map(t => parseFloat(t)) // remove ' s' using parseFloat
    .reduce((a, b) => a + b, 0) / timeArr.length;

  const passedTests = submission.testCaseResults.filter(tc => tc.passed).length;
  const totalTests = submission.testCaseResults.length;
  const successRate = (passedTests / totalTests) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-base-200 shadow-md">
          <div className="card-body p-4">
            <h3 className="card-title text-sm">Status</h3>
            <div className={`text-lg font-semibold font-mono ${submission.status === 'Accepted' ? `${theme === 'lemonade' ? 'text-green-500': 'text-success'}` : 'text-error'
              }`}>
              {submission.status}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body p-4">
            <h3 className="card-title text-sm">Success Rate</h3>
            <div className="text-lg font-semibold">
              {successRate.toFixed(1)}%
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Avg. Runtime
            </h3>
            <div className="text-lg font-semibold">
              {avgTime.toFixed(3)} s
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body p-4">
            <h3 className="card-title text-sm flex items-center gap-2">
              <Memory className="size-4" />
              Avg. Memory
            </h3>
            <div className="text-lg font-semibold">
              {avgMemory.toFixed(0)} KB
            </div>
          </div>
        </div>
      </div>

      {/* Test Cases Results */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="font-bold mb-4 text-md">Test Cases Results</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Expected</th>
                  <th>Output</th>
                  <th>Memory</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {submission.testCaseResults.map((testCase) => (
                  <tr key={testCase.id}>
                    <td>
                      {testCase.passed ? (
                        <div className={`flex items-center gap-2 ${theme === 'lemonade' ? 'text-green-500' : 'text-success'}`}>
                          <CheckCircle2 className="size-4" />
                          Passed
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-error">
                          <XCircle className="size-4" />
                          Failed
                        </div>
                      )}
                    </td>
                    <td className="font-mono text-sm">{testCase.expected}</td>
                    <td className="font-mono text-sm">{testCase.stdout || 'null'}</td>
                    <td className="text-sm">{testCase.memory}</td>
                    <td className="text-sm">{testCase.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubmissionResults