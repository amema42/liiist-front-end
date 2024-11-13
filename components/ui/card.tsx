import React, { ReactNode } from 'react';
import styles from './Card.module.css';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

export const CardHeader = ({ children }: { children: ReactNode }) => {
  return <div className={styles.cardHeader}>{children}</div>;
};

export const CardTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className={styles.cardTitle}>{children}</h2>;
};

export const CardContent = ({ children }: { children: ReactNode }) => {
  return <div className={styles.cardContent}>{children}</div>;
};
