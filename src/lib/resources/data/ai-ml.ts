import { category, subcategory } from "../helpers";

export const aiMl = category(
  "ai-ml",
  "AI & Machine Learning",
  "From machine learning fundamentals to LLM engineering — official docs and trusted courses.",
  [
    subcategory("ml", "Machine Learning", [
      {
        title: "Google Machine Learning Crash Course",
        description:
          "Google's free, hands-on introduction to machine learning concepts.",
        url: "https://developers.google.com/machine-learning/crash-course",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["google", "course", "fundamentals"],
      },
      {
        title: "Machine Learning — Andrew Ng (Coursera)",
        description:
          "The classic Stanford course that has introduced millions to ML.",
        url: "https://www.coursera.org/learn/machine-learning",
        difficulty: "Beginner",
        access: "Freemium",
        badge: "Video Course",
        tags: ["coursera", "stanford", "course"],
      },
      {
        title: "fast.ai — Practical Deep Learning",
        description:
          "A top-down, code-first course that gets you building models fast.",
        url: "https://course.fast.ai/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["fastai", "code first", "course"],
      },
      {
        title: "Kaggle — Intro to Machine Learning",
        description:
          "A free micro-course that gets you building your first ML models fast.",
        url: "https://www.kaggle.com/learn/intro-to-machine-learning",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["kaggle", "micro course", "hands on"],
      },
      {
        title: "Open Machine Learning Course (mlcourse.ai)",
        description:
          "A free, well-structured open course covering core ML algorithms.",
        url: "https://mlcourse.ai/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["open course", "algorithms", "free"],
      },
      {
        title: "scikit-learn — User Guide",
        description:
          "The official tutorials for Python's most popular ML library.",
        url: "https://scikit-learn.org/stable/user_guide.html",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["scikit-learn", "python", "tutorial"],
      },
    ]),
    subcategory("dl", "Deep Learning", [
      {
        title: "DeepLearning.AI Courses",
        description:
          "Andrew Ng's official deep learning specialization and short courses.",
        url: "https://www.deeplearning.ai/courses/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["deeplearning.ai", "andrew ng", "courses"],
      },
      {
        title: "Deep Learning (the book)",
        description:
          "The canonical reference text by Goodfellow, Bengio, and Courville — free online.",
        url: "https://www.deeplearningbook.org/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Book",
        tags: ["book", "textbook", "free"],
      },
      {
        title: "Stanford CS231n — CNNs for Visual Recognition",
        description:
          "The legendary Stanford course on convolutional neural networks.",
        url: "https://cs231n.stanford.edu/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Video Course",
        tags: ["stanford", "cnn", "computer vision"],
      },
      {
        title: "Stanford CS224n — NLP with Deep Learning",
        description:
          "Stanford's definitive course on deep learning for natural language.",
        url: "https://web.stanford.edu/class/cs224n/",
        difficulty: "Advanced",
        access: "Free",
        badge: "Video Course",
        tags: ["stanford", "nlp", "transformers"],
      },
      {
        title: "Karpathy — Hacker's Guide to Neural Networks",
        description:
          "A lucid, code-first explanation of how neural networks actually work.",
        url: "https://karpathy.github.io/neuralnets/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["karpathy", "from scratch", "article"],
      },
    ]),
    subcategory("pytorch", "PyTorch", [
      {
        title: "PyTorch Documentation",
        description:
          "The official PyTorch docs — API reference and ecosystem guides.",
        url: "https://pytorch.org/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["pytorch", "docs", "official"],
      },
      {
        title: "PyTorch Tutorials",
        description:
          "Official tutorials from 60-minute blitz to production deployment.",
        url: "https://pytorch.org/tutorials/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorials", "deep learning", "official"],
      },
      {
        title: "Learn PyTorch (learnpytorch.io)",
        description:
          "A free, project-based course teaching PyTorch and deep learning from scratch.",
        url: "https://www.learnpytorch.io/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["course", "zero to mastery", "free"],
      },
      {
        title: "PyTorch — GitHub repository",
        description:
          "The open-source PyTorch framework source and developer discussions.",
        url: "https://github.com/pytorch/pytorch",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source"],
      },
      {
        title: "PyTorch Cheat Sheet (pytorch.org)",
        description:
          "Official cheat sheets for common PyTorch operations and workflows.",
        url: "https://pytorch.org/tutorials/beginner/ptcheat.html",
        difficulty: "Beginner",
        access: "Free",
        badge: "Cheat Sheet",
        tags: ["cheatsheet", "quick reference", "official"],
      },
    ]),
    subcategory("tensorflow", "TensorFlow", [
      {
        title: "TensorFlow Documentation",
        description:
          "The official TensorFlow docs — guides, tutorials, and API reference.",
        url: "https://www.tensorflow.org/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["tensorflow", "docs", "official"],
      },
      {
        title: "TensorFlow Tutorials",
        description:
          "Official hands-on tutorials covering TF, Keras, and real workloads.",
        url: "https://www.tensorflow.org/tutorials",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["tutorials", "keras", "hands on"],
      },
      {
        title: "TensorFlow — Learn",
        description:
          "Official learning paths for ML with TensorFlow and Keras.",
        url: "https://www.tensorflow.org/learn",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["learn", "course", "official"],
      },
      {
        title: "TensorFlow API Reference",
        description:
          "The complete official API reference for TensorFlow and Keras.",
        url: "https://www.tensorflow.org/api_docs",
        difficulty: "Advanced",
        access: "Free",
        badge: "Documentation",
        tags: ["api", "reference", "keras"],
      },
      {
        title: "TensorFlow — GitHub repository",
        description:
          "The open-source TensorFlow framework source and community.",
        url: "https://github.com/tensorflow/tensorflow",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source"],
      },
    ]),
    subcategory("huggingface", "Hugging Face", [
      {
        title: "Hugging Face Documentation",
        description:
          "Official docs for the Hugging Face platform and libraries.",
        url: "https://huggingface.co/docs",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["huggingface", "docs", "official"],
      },
      {
        title: "Hugging Face — NLP Course",
        description:
          "The free, official course on modern NLP with transformers.",
        url: "https://huggingface.co/learn/nlp-course",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Video Course",
        tags: ["nlp course", "transformers", "free"],
      },
      {
        title: "Transformers Documentation",
        description:
          "Official docs for the transformers library — the standard for modern ML.",
        url: "https://huggingface.co/docs/transformers",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Documentation",
        tags: ["transformers", "library", "models"],
      },
      {
        title: "Hugging Face — Model Hub",
        description:
          "Browse and use hundreds of thousands of open models and datasets.",
        url: "https://huggingface.co/models",
        difficulty: "Beginner",
        access: "Free",
        badge: "Interactive",
        tags: ["models", "datasets", "hub"],
      },
      {
        title: "Transformers — GitHub repository",
        description:
          "The open-source transformers library source and community.",
        url: "https://github.com/huggingface/transformers",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source"],
      },
    ]),
    subcategory("llm", "LLM Engineering", [
      {
        title: "OpenAI Documentation",
        description:
          "Official docs for the OpenAI API — models, tools, and guides.",
        url: "https://platform.openai.com/docs",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["openai", "api", "official"],
      },
      {
        title: "Anthropic Documentation",
        description:
          "Official docs for Claude — models, prompting, and the API.",
        url: "https://docs.anthropic.com/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["anthropic", "claude", "official"],
      },
      {
        title: "The LLM Course (mlabonne)",
        description:
          "A comprehensive, community-curated course on building LLM applications.",
        url: "https://github.com/mlabonne/llm-course",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["course", "github", "llm apps"],
      },
      {
        title: "Awesome LLM",
        description:
          "A curated list of LLM frameworks, papers, and resources.",
        url: "https://github.com/Hannibal046/Awesome-LLM",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["awesome list", "papers", "frameworks"],
      },
      {
        title: "Building LLM-Powered Apps — DeepLearning.AI",
        description:
          "Hands-on short courses on LLM application patterns and tooling.",
        url: "https://www.deeplearning.ai/short-courses/",
        difficulty: "Intermediate",
        access: "Freemium",
        badge: "Video Course",
        tags: ["short courses", "hands on", "llm apps"],
      },
    ]),
    subcategory("prompt-engineering", "Prompt Engineering", [
      {
        title: "Prompt Engineering Guide",
        description:
          "The most comprehensive free guide to prompt engineering techniques.",
        url: "https://www.promptingguide.ai/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Documentation",
        tags: ["guide", "techniques", "free"],
      },
      {
        title: "Anthropic — Prompt Engineering",
        description:
          "Anthropic's official, in-depth guide to prompting Claude effectively.",
        url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["anthropic", "claude", "official"],
      },
      {
        title: "OpenAI — Prompt Engineering Guide",
        description:
          "OpenAI's official guidance on prompting and best practices.",
        url: "https://platform.openai.com/docs/guides/prompt-engineering",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["openai", "gpt", "official"],
      },
      {
        title: "Learn Prompting",
        description:
          "A free, structured course on prompt engineering fundamentals.",
        url: "https://learnprompting.org/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Video Course",
        tags: ["course", "structured", "free"],
      },
      {
        title: "Prompt Engineering Guide — GitHub",
        description:
          "The open-source repository behind the DAIR.AI prompt guide.",
        url: "https://github.com/dair-ai/Prompt-Engineering-Guide",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["dair.ai", "github", "guide"],
      },
    ]),
    subcategory("rag", "RAG", [
      {
        title: "LangChain Documentation",
        description:
          "Official docs for the most popular framework for building LLM applications.",
        url: "https://python.langchain.com/docs/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["langchain", "framework", "official"],
      },
      {
        title: "LlamaIndex Documentation",
        description:
          "Official docs for the data framework built for RAG applications.",
        url: "https://docs.llamaindex.ai/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["llamaindex", "data framework", "official"],
      },
      {
        title: "Pinecone — Learn",
        description:
          "In-depth articles on vector search, embeddings, and RAG architecture.",
        url: "https://www.pinecone.io/learn/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["pinecone", "articles", "vector search"],
      },
      {
        title: "What is RAG? — IBM",
        description:
          "A clear explainer of retrieval-augmented generation and why it matters.",
        url: "https://www.ibm.com/topics/retrieval-augmented-generation",
        difficulty: "Beginner",
        access: "Free",
        badge: "Community",
        tags: ["explainer", "concepts", "ibm"],
      },
      {
        title: "LangChain — GitHub repository",
        description:
          "The open-source LangChain framework source and community.",
        url: "https://github.com/langchain-ai/langchain",
        difficulty: "Advanced",
        access: "Free",
        badge: "Community",
        tags: ["github", "open source", "source"],
      },
    ]),
    subcategory("vector-databases", "Vector Databases", [
      {
        title: "Pinecone — What is a Vector Database?",
        description:
          "A thorough, timeless introduction to vector databases and similarity search.",
        url: "https://www.pinecone.io/learn/vector-database/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Community",
        tags: ["pinecone", "intro", "vector search"],
      },
      {
        title: "Qdrant Documentation",
        description:
          "Official docs for the Qdrant vector search engine.",
        url: "https://qdrant.tech/documentation/",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["qdrant", "docs", "vector search"],
      },
      {
        title: "Weaviate Documentation",
        description:
          "Official docs for the Weaviate vector database.",
        url: "https://weaviate.io/developers/weaviate",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["weaviate", "docs", "vectors"],
      },
      {
        title: "Milvus Documentation",
        description:
          "Official docs for the open-source Milvus vector database.",
        url: "https://milvus.io/docs",
        difficulty: "Intermediate",
        access: "Free",
        badge: "Official",
        tags: ["milvus", "docs", "open source"],
      },
      {
        title: "Chroma Documentation",
        description:
          "Official docs for Chroma, the open-source AI-native embedding database.",
        url: "https://docs.trychroma.com/",
        difficulty: "Beginner",
        access: "Free",
        badge: "Official",
        tags: ["chroma", "embeddings", "docs"],
      },
    ]),
  ],
);
