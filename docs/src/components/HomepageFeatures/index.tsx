import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '📋 Documentação Swagger Automática',
    description: (
      <>
        Interface interativa gerada automaticamente com base nos seus dados JSON.
        Teste endpoints diretamente no navegador com schemas e exemplos reais.
      </>
    ),
  },
  {
    title: '🔧 Headers e Cookies Mockados',
    description: (
      <>
        Simule comportamentos reais de API com headers customizados e cookies.
        Perfeito para testar autenticação, cache, paginação e muito mais.
      </>
    ),
  },
  {
    title: '🚀 Fácil de Usar',
    description: (
      <>
        Modo arquivo ou pasta, parâmetros de path automáticos, CORS habilitado.
        De arquivos JSON simples a APIs complexas em minutos.
      </>
    ),
  },
];

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">

        {/* Seção de exemplo de código */}
        <div className={styles.codeExample}>
          <div className="row">
            <div className="col col--12">
              <Heading as="h2" className="text--center margin-bottom--lg">
                ⚡ Exemplo Rápido
              </Heading>
            </div>
          </div>
          <div className="row">
            <div className="col col--6">
              <h4>1. Crie um arquivo JSON:</h4>
              <div className={styles.codeBlock}>
                <pre>
                  <code>
                    {`
{
  "endpoints": {
    "users": {
      "GET": {
        "body": [
          { "id": 1, "name": "João" },
          { "id": 2, "name": "Maria" }
        ],
        "headers": {
          "X-Total-Count": "2"
        },
        "cookies": {
          "session": "abc123"
        }
      }
    }
  }
}
                  `}
                  </code>
                </pre>
              </div>
            </div>
            <div className="col col--6">
              <h4>2. Execute o comando:</h4>
              <div className={styles.codeBlock}>
                <pre>
                  <code>npx --yes json-server-mock-plus -f db.json</code>
                </pre>
              </div>
              <h4>3. Acesse:</h4>
              <ul>
                <li><strong>Swagger UI:</strong> <code>http://localhost:3000/</code></li>
                <li><strong>API:</strong> <code>http://localhost:3000/users</code></li>
              </ul>
              <div className={styles.resultBox}>
                <strong>✨ Resultado:</strong> API completa com documentação interativa,
                headers customizados e cookies funcionando!
              </div>
            </div>
          </div>
        </div>


        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section >
  );
}
