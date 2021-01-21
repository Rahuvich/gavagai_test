export interface RootObject {
  wordInformation?: WordInformation;
  semanticallySimilarWords?: SemanticallySimilarWord[];
}

export interface SemanticallySimilarWord {
  word: string;
  forWord: string;
  strength: number;
}

export interface WordInformation {
  word: string;
  frequency: number;
  documentFrequency: number;
  absoluteRank: number;
  relativeRank: number;
  vocabularySize: number;
  additionalInformation: AdditionalInformation;
}

export interface AdditionalInformation {
  link: string;
}
