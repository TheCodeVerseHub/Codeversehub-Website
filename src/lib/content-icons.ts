import {
  AlertTriangle,
  BookOpen,
  Calendar,
  FileText,
  Gavel,
  HandHeart,
  Heart,
  HelpCircle,
  Info,
  Lock,
  MessageCircleQuestion,
  ScrollText,
  Shield,
  Tag,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Maps frontmatter `icon` values to lucide icons for content pages. */
export const contentIcons: Record<string, LucideIcon> = {
  shield: Shield,
  "book-open": BookOpen,
  "scroll-text": ScrollText,
  "help-circle": HelpCircle,
  "message-circle-question": MessageCircleQuestion,
  users: Users,
  "file-text": FileText,
  heart: Heart,
  lock: Lock,
  "alert-triangle": AlertTriangle,
  info: Info,
  tag: Tag,
  gavel: Gavel,
  "hand-heart": HandHeart,
  calendar: Calendar,
};

/** Used when a page's frontmatter references an unknown icon name. */
export const FallbackContentIcon = FileText;
