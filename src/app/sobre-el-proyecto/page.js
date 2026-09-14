import Link from 'next/link';

export default function SobreElProyectoPage() {
  return (
    <main className="atlas-page about-page">
      <section className="atlas-topbar">
        <span className="section-label dark-label">Atlas del Cultivo Argentino</span>
        <nav className="atlas-breadcrumb" aria-label="Breadcrumb">
          <Link className="crumb" href="/">Inicio</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Sobre el proyecto</span>
        </nav>
      </section>

      <section className="atlas-category-hero">
        <div>
          <span className="section-label dark-label">El Atlas del Cultivo Argentino</span>
          <h1>El cultivo cambia según dónde estés.</h1>
          <p className="atlas-lede">
            Argentina no es un lugar único para cultivar. Es un territorio enorme, atravesado por
            distintas latitudes, relieves, alturas, temperaturas, precipitaciones, estaciones y
            condiciones ambientales. Una misma planta puede encontrarse con condiciones
            completamente diferentes según el lugar donde crezca.
          </p>
        </div>
      </section>

      <section className="atlas-section about-prose">
        <p>
          Por eso este proyecto parte de una pregunta sencilla: ¿qué cambia cuando cambia el
          lugar? El Atlas del Cultivo Argentino nace para responder esa pregunta desde el
          conocimiento y no desde las recetas. Queremos construir una referencia argentina sobre
          Cannabis que permita entender la relación entre la planta y el territorio.
        </p>
        <p>
          No solamente qué ocurre con una semilla cuando germina, sino también qué significa
          hacerlo en determinada latitud, qué papel tiene la duración del día, cómo cambia el
          ambiente, qué información existe sobre una determinada región y, sobre todo, qué sabemos
          realmente y qué todavía no sabemos.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Un atlas, no una receta</h2></div>
        </div>
        <p>
          El Atlas no pretende decirle a todo el país que haga exactamente lo mismo. Una guía que
          funciona para una determinada región puede no explicar correctamente otra. Por eso cada
          contenido intenta separar lo que sabemos de la planta, lo que sabemos del ambiente, lo
          que está documentado para Argentina, lo que está documentado específicamente para una
          región, lo que puede calcularse, lo que puede inferirse, y aquello para lo que todavía no
          existe suficiente evidencia.
        </p>
        <p>
          Cuando no encontramos una respuesta confiable, preferimos decir que no la encontramos
          antes que inventarla.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>El territorio importa</h2></div>
        </div>
        <p>
          La geografía no es una decoración dentro del Atlas. Es parte de la información. La
          latitud modifica la duración del día. La altitud modifica las condiciones ambientales.
          Las estaciones cambian según la región. La temperatura, el agua, las lluvias, las
          heladas y la humedad pueden modificar el contexto en el que se desarrolla una planta. Y
          la genética también importa.
        </p>
        <p>
          Por eso el Atlas busca conectar planta, genética, fotoperiodo, ambiente y territorio, en
          lugar de tratar cada elemento como una información aislada.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Conocer la planta</h2></div>
        </div>
        <p>
          El Atlas también busca recuperar algo que muchas guías dejan de lado: la planta tiene
          una historia. Su domesticación, su expansión por el mundo, sus usos históricos, su
          llegada a América y su historia en el territorio argentino forman parte de la
          comprensión de Cannabis.
        </p>
        <p>
          La historia de las semillas, del cáñamo, de las primeras iniciativas de cultivo y de las
          personas e instituciones que participaron en ellas también forma parte de este Atlas.
          Porque entender una planta también implica entender de dónde viene.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Conocimiento argentino</h2></div>
        </div>
        <p>
          Una de las principales razones para construir este proyecto es que gran parte de la
          información disponible sobre Cannabis fue producida pensando en otros territorios. El
          Atlas busca reunir y hacer visible el conocimiento producido en Argentina:
          investigaciones, ensayos, cultivares, experiencias documentadas, universidades, CONICET,
          INTA, INASE, SENASA, instituciones provinciales, investigadores y profesionales — y
          también fuentes secundarias y experiencias territoriales, siempre identificando qué tipo
          de evidencia representan.
        </p>
        <p>El objetivo no es acumular información. Es ordenarla, contrastarla y darle contexto.</p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Una red de conocimiento</h2></div>
        </div>
        <p>
          El Atlas no pretende construir todo ese conocimiento solo. Queremos que puedan
          participar clubes cannábicos, investigadores, universidades, profesionales,
          asociaciones, educadores, especialistas y personas que trabajan con Cannabis en
          distintas partes del país. La idea es construir una red donde el conocimiento pueda
          circular y donde cada territorio pueda aportar algo que difícilmente aparece en una guía
          nacional genérica.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Clubes y comunidad</h2></div>
        </div>
        <p>
          Los clubes pueden convertirse en protagonistas de esta red. No solamente como sponsors:
          también como espacios educativos y territoriales. Un club puede compartir cursos,
          talleres, charlas, actividades, eventos y contenidos, tener presencia propia dentro del
          Atlas y formar parte de la agenda de su provincia. También puede participar en
          conversaciones, entrevistas y proyectos de documentación del conocimiento regional.
        </p>
        <p>
          La relación entre el Atlas y sus aliados debe ser transparente: el patrocinio permite
          sostener el proyecto, pero no compra el contenido editorial.
        </p>
        <p>
          <Link href="/comunidad">Conocer la sección Comunidad ↗</Link>
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Educación</h2></div>
        </div>
        <p>
          El Atlas busca que aprender sea parte central de la experiencia. Por eso el proyecto
          puede integrar cursos online, talleres, charlas, entrevistas, material educativo,
          eventos, investigación y contenidos desarrollados junto a especialistas. La información
          comercial y la información editorial deben permanecer diferenciadas.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Lo que todavía no sabemos</h2></div>
        </div>
        <p>
          Un Atlas también sirve para mostrar los vacíos del mapa. Hay provincias donde existe
          mucha información ambiental pero poca investigación específica sobre Cannabis. Hay
          preguntas sobre adaptación, genética, ciclos y cultivo regional que todavía necesitan
          investigación.
        </p>
        <p>
          Esos vacíos no son un problema que haya que ocultar. Son parte del conocimiento que
          todavía falta construir. El Atlas también quiere mostrar dónde están esas preguntas.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Qué es y qué no es el Atlas</h2></div>
        </div>
        <div className="about-what-grid">
          <div className="about-what-card about-what-no">
            <h3>El Atlas NO es</h3>
            <ul>
              <li>una tienda</li>
              <li>un catálogo de productos</li>
              <li>una plataforma para vender Cannabis</li>
              <li>un dispensario</li>
              <li>una guía de consumo</li>
              <li>una plataforma de recomendaciones comerciales disfrazadas de contenido editorial</li>
            </ul>
          </div>
          <div className="about-what-card about-what-yes">
            <h3>El Atlas SÍ es</h3>
            <ul>
              <li>una plataforma educativa</li>
              <li>un atlas geográfico</li>
              <li>una biblioteca de conocimiento</li>
              <li>una herramienta de consulta</li>
              <li>un espacio para conectar conocimiento y territorio</li>
              <li>una plataforma para documentar experiencias y fuentes</li>
              <li>un espacio para actividad educativa y comunitaria</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Independencia editorial y responsabilidad</h2></div>
        </div>
        <p>
          El Atlas distingue entre contenido editorial, contenido educativo, contenido patrocinado,
          contenido comunitario y contenido institucional. Un sponsor no puede comprar una
          conclusión científica ni alterar una ficha provincial. La publicidad y el patrocinio se
          identifican siempre de forma clara — nunca se mezclan con el contenido editorial que
          describe la planta, el ambiente o el territorio.
        </p>
        <p>
          Esta misma disciplina es la que ya rige el resto del Atlas: cada dato editorial señala su
          fuente y su nivel de evidencia, y ningún patrocinio cambia esa jerarquía.
        </p>
      </section>

      <section className="atlas-section about-prose">
        <div className="section-heading">
          <div><h2>Un proyecto en construcción</h2></div>
        </div>
        <p>
          El Atlas del Cultivo Argentino no pretende ser una obra terminada. Argentina cambia. La
          investigación avanza. Aparecen nuevos estudios. Se registran nuevos cultivares. Se
          generan nuevos datos. Se aprende de nuevas experiencias. Por eso el Atlas está pensado
          como una obra viva: un mapa que puede crecer a medida que crece el conocimiento.
        </p>
        <p>
          El objetivo final no es tener la mayor cantidad de páginas. Es construir una de las
          referencias más completas, transparentes y contextualizadas sobre Cannabis y territorio
          argentino. Porque cultivar no ocurre en abstracto. Ocurre en un lugar. Y ese lugar
          importa.
        </p>
      </section>
    </main>
  );
}
